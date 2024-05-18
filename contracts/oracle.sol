// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

// src/Comet/contracts/CometConfiguration.sol

/**
 * @title Compound's Comet Configuration Interface
 * @author Compound
 */
contract CometConfiguration {
    struct ExtConfiguration {
        bytes32 name32;
        bytes32 symbol32;
    }

    struct Configuration {
        address governor;
        address pauseGuardian;
        address baseToken;
        address baseTokenPriceFeed;
        address extensionDelegate;
        uint64 supplyKink;
        uint64 supplyPerYearInterestRateSlopeLow;
        uint64 supplyPerYearInterestRateSlopeHigh;
        uint64 supplyPerYearInterestRateBase;
        uint64 borrowKink;
        uint64 borrowPerYearInterestRateSlopeLow;
        uint64 borrowPerYearInterestRateSlopeHigh;
        uint64 borrowPerYearInterestRateBase;
        uint64 storeFrontPriceFactor;
        uint64 trackingIndexScale;
        uint64 baseTrackingSupplySpeed;
        uint64 baseTrackingBorrowSpeed;
        uint104 baseMinForRewards;
        uint104 baseBorrowMin;
        uint104 targetReserves;
        AssetConfig[] assetConfigs;
    }

    struct AssetConfig {
        address asset;
        address priceFeed;
        uint8 decimals;
        uint64 borrowCollateralFactor;
        uint64 liquidateCollateralFactor;
        uint64 liquidationFactor;
        uint128 supplyCap;
    }
}

// src/Comet/contracts/CometMath.sol

/**
 * @title Compound's Comet Math Contract
 * @dev Pure math functions
 * @author Compound
 */
contract CometMath {
    /**
     * Custom errors *
     */
    error InvalidUInt64();
    error InvalidUInt104();
    error InvalidUInt128();
    error InvalidInt104();
    error InvalidInt256();
    error NegativeNumber();

    function safe64(uint256 n) internal pure returns (uint64) {
        if (n > type(uint64).max) revert InvalidUInt64();
        return uint64(n);
    }

    function safe104(uint256 n) internal pure returns (uint104) {
        if (n > type(uint104).max) revert InvalidUInt104();
        return uint104(n);
    }

    function safe128(uint256 n) internal pure returns (uint128) {
        if (n > type(uint128).max) revert InvalidUInt128();
        return uint128(n);
    }

    function signed104(uint104 n) internal pure returns (int104) {
        if (n > uint104(type(int104).max)) revert InvalidInt104();
        return int104(n);
    }

    function signed256(uint256 n) internal pure returns (int256) {
        if (n > uint256(type(int256).max)) revert InvalidInt256();
        return int256(n);
    }

    function unsigned104(int104 n) internal pure returns (uint104) {
        if (n < 0) revert NegativeNumber();
        return uint104(n);
    }

    function unsigned256(int256 n) internal pure returns (uint256) {
        if (n < 0) revert NegativeNumber();
        return uint256(n);
    }

    function toUInt8(bool x) internal pure returns (uint8) {
        return x ? 1 : 0;
    }

    function toBool(uint8 x) internal pure returns (bool) {
        return x != 0;
    }
}

// src/Comet/contracts/CometStorage.sol

/**
 * @title Compound's Comet Storage Interface
 * @dev Versions can enforce append-only storage slots via inheritance.
 * @author Compound
 */
contract CometStorage {
    // 512 bits total = 2 slots
    struct TotalsBasic {
        // 1st slot
        uint64 baseSupplyIndex;
        uint64 baseBorrowIndex;
        uint64 trackingSupplyIndex;
        uint64 trackingBorrowIndex;
        // 2nd slot
        uint104 totalSupplyBase;
        uint104 totalBorrowBase;
        uint40 lastAccrualTime;
        uint8 pauseFlags;
    }

    struct TotalsCollateral {
        uint128 totalSupplyAsset;
        uint128 _reserved;
    }

    struct UserBasic {
        int104 principal;
        uint64 baseTrackingIndex;
        uint64 baseTrackingAccrued;
        uint16 assetsIn;
        uint8 _reserved;
    }

    struct UserCollateral {
        uint128 balance;
        uint128 _reserved;
    }

    struct LiquidatorPoints {
        uint32 numAbsorbs;
        uint64 numAbsorbed;
        uint128 approxSpend;
        uint32 _reserved;
    }

    /// @dev Aggregate variables tracked for the entire market
    uint64 internal baseSupplyIndex;
    uint64 internal baseBorrowIndex;
    uint64 internal trackingSupplyIndex;
    uint64 internal trackingBorrowIndex;
    uint104 internal totalSupplyBase;
    uint104 internal totalBorrowBase;
    uint40 internal lastAccrualTime;
    uint8 internal pauseFlags;

    /// @notice Aggregate variables tracked for each collateral asset
    mapping(address => TotalsCollateral) public totalsCollateral;

    /// @notice Mapping of users to accounts which may be permitted to manage the user account
    mapping(address => mapping(address => bool)) public isAllowed;

    /// @notice The next expected nonce for an address, for validating authorizations via signature
    mapping(address => uint256) public userNonce;

    /// @notice Mapping of users to base principal and other basic data
    mapping(address => UserBasic) public userBasic;

    /// @notice Mapping of users to collateral data per collateral asset
    mapping(address => mapping(address => UserCollateral))
        public userCollateral;

    /// @notice Mapping of magic liquidator points
    mapping(address => LiquidatorPoints) public liquidatorPoints;
}

// src/Comet/contracts/vendor/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    // getRoundData and latestRoundData should both raise "No data present"
    // if they do not have data to report, instead of returning unset values
    // which could be misinterpreted as actual reported values.
    function getRoundData(
        uint80 _roundId
    )
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

// src/Comet/contracts/CometCore.sol

abstract contract CometCore is CometConfiguration, CometStorage, CometMath {
    struct AssetInfo {
        uint8 offset;
        address asset;
        address priceFeed;
        uint64 scale;
        uint64 borrowCollateralFactor;
        uint64 liquidateCollateralFactor;
        uint64 liquidationFactor;
        uint128 supplyCap;
    }

    /**
     * Internal constants *
     */

    /// @dev The max number of assets this contract is hardcoded to support
    ///  Do not change this variable without updating all the fields throughout the contract,
    //    including the size of UserBasic.assetsIn and corresponding integer conversions.
    uint8 internal constant MAX_ASSETS = 15;

    /// @dev The max number of decimals base token can have
    ///  Note this cannot just be increased arbitrarily.
    uint8 internal constant MAX_BASE_DECIMALS = 18;

    /// @dev The max value for a collateral factor (1)
    uint64 internal constant MAX_COLLATERAL_FACTOR = FACTOR_SCALE;

    /// @dev Offsets for specific actions in the pause flag bit array
    uint8 internal constant PAUSE_SUPPLY_OFFSET = 0;
    uint8 internal constant PAUSE_TRANSFER_OFFSET = 1;
    uint8 internal constant PAUSE_WITHDRAW_OFFSET = 2;
    uint8 internal constant PAUSE_ABSORB_OFFSET = 3;
    uint8 internal constant PAUSE_BUY_OFFSET = 4;

    /// @dev The decimals required for a price feed
    uint8 internal constant PRICE_FEED_DECIMALS = 8;

    /// @dev 365 days * 24 hours * 60 minutes * 60 seconds
    uint64 internal constant SECONDS_PER_YEAR = 31_536_000;

    /// @dev The scale for base tracking accrual
    uint64 internal constant BASE_ACCRUAL_SCALE = 1e6;

    /// @dev The scale for base index (depends on time/rate scales, not base token)
    uint64 internal constant BASE_INDEX_SCALE = 1e15;

    /// @dev The scale for prices (in USD)
    uint64 internal constant PRICE_SCALE = uint64(10 ** PRICE_FEED_DECIMALS);

    /// @dev The scale for factors
    uint64 internal constant FACTOR_SCALE = 1e18;

    /**
     * @notice Determine if the manager has permission to act on behalf of the owner
     * @param owner The owner account
     * @param manager The manager account
     * @return Whether or not the manager has permission
     */
    function hasPermission(
        address owner,
        address manager
    ) public view returns (bool) {
        return owner == manager || isAllowed[owner][manager];
    }

    /**
     * @dev The positive present supply balance if positive or the negative borrow balance if negative
     */
    function presentValue(
        int104 principalValue_
    ) internal view returns (int256) {
        if (principalValue_ >= 0) {
            return
                signed256(
                    presentValueSupply(
                        baseSupplyIndex,
                        uint104(principalValue_)
                    )
                );
        } else {
            return
                -signed256(
                    presentValueBorrow(
                        baseBorrowIndex,
                        uint104(-principalValue_)
                    )
                );
        }
    }

    /**
     * @dev The principal amount projected forward by the supply index
     */
    function presentValueSupply(
        uint64 baseSupplyIndex_,
        uint104 principalValue_
    ) internal pure returns (uint256) {
        return (uint256(principalValue_) * baseSupplyIndex_) / BASE_INDEX_SCALE;
    }

    /**
     * @dev The principal amount projected forward by the borrow index
     */
    function presentValueBorrow(
        uint64 baseBorrowIndex_,
        uint104 principalValue_
    ) internal pure returns (uint256) {
        return (uint256(principalValue_) * baseBorrowIndex_) / BASE_INDEX_SCALE;
    }

    /**
     * @dev The positive principal if positive or the negative principal if negative
     */
    function principalValue(
        int256 presentValue_
    ) internal view returns (int104) {
        if (presentValue_ >= 0) {
            return
                signed104(
                    principalValueSupply(
                        baseSupplyIndex,
                        uint256(presentValue_)
                    )
                );
        } else {
            return
                -signed104(
                    principalValueBorrow(
                        baseBorrowIndex,
                        uint256(-presentValue_)
                    )
                );
        }
    }

    /**
     * @dev The present value projected backward by the supply index (rounded down)
     *  Note: This will overflow (revert) at 2^104/1e18=~20 trillion principal for assets with 18 decimals.
     */
    function principalValueSupply(
        uint64 baseSupplyIndex_,
        uint256 presentValue_
    ) internal pure returns (uint104) {
        return safe104((presentValue_ * BASE_INDEX_SCALE) / baseSupplyIndex_);
    }

    /**
     * @dev The present value projected backward by the borrow index (rounded up)
     *  Note: This will overflow (revert) at 2^104/1e18=~20 trillion principal for assets with 18 decimals.
     */
    function principalValueBorrow(
        uint64 baseBorrowIndex_,
        uint256 presentValue_
    ) internal pure returns (uint104) {
        return
            safe104(
                (presentValue_ * BASE_INDEX_SCALE + baseBorrowIndex_ - 1) /
                    baseBorrowIndex_
            );
    }
}

// src/Comet/contracts/CometExtInterface.sol

/**
 * @title Compound's Comet Ext Interface
 * @notice An efficient monolithic money market protocol
 * @author Compound
 */
abstract contract CometExtInterface is CometCore {
    error BadAmount();
    error BadNonce();
    error BadSignatory();
    error InvalidValueS();
    error InvalidValueV();
    error SignatureExpired();

    function allow(address manager, bool isAllowed) external virtual;

    function allowBySig(
        address owner,
        address manager,
        bool isAllowed,
        uint256 nonce,
        uint256 expiry,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual;

    function collateralBalanceOf(
        address account,
        address asset
    ) external view virtual returns (uint128);

    function baseTrackingAccrued(
        address account
    ) external view virtual returns (uint64);

    function baseAccrualScale() external view virtual returns (uint64);

    function baseIndexScale() external view virtual returns (uint64);

    function factorScale() external view virtual returns (uint64);

    function priceScale() external view virtual returns (uint64);

    function maxAssets() external view virtual returns (uint8);

    function totalsBasic() external view virtual returns (TotalsBasic memory);

    function version() external view virtual returns (string memory);

    function name() external view virtual returns (string memory);

    function symbol() external view virtual returns (string memory);

    function approve(
        address spender,
        uint256 amount
    ) external virtual returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view virtual returns (uint256);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );
}

// src/Comet/contracts/CometMainInterface.sol

/**
 * @title Compound's Comet Main Interface (without Ext)
 * @notice An efficient monolithic money market protocol
 * @author Compound
 */
abstract contract CometMainInterface is CometCore {
    error Absurd();
    error AlreadyInitialized();
    error BadAsset();
    error BadDecimals();
    error BadDiscount();
    error BadMinimum();
    error BadPrice();
    error BorrowTooSmall();
    error BorrowCFTooLarge();
    error InsufficientReserves();
    error LiquidateCFTooLarge();
    error NoSelfTransfer();
    error NotCollateralized();
    error NotForSale();
    error NotLiquidatable();
    error Paused();
    error SupplyCapExceeded();
    error TimestampTooLarge();
    error TooManyAssets();
    error TooMuchSlippage();
    error TransferInFailed();
    error TransferOutFailed();
    error Unauthorized();

    event Supply(address indexed from, address indexed dst, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Withdraw(address indexed src, address indexed to, uint256 amount);

    event SupplyCollateral(
        address indexed from,
        address indexed dst,
        address indexed asset,
        uint256 amount
    );
    event TransferCollateral(
        address indexed from,
        address indexed to,
        address indexed asset,
        uint256 amount
    );
    event WithdrawCollateral(
        address indexed src,
        address indexed to,
        address indexed asset,
        uint256 amount
    );

    /// @notice Event emitted when a borrow position is absorbed by the protocol
    event AbsorbDebt(
        address indexed absorber,
        address indexed borrower,
        uint256 basePaidOut,
        uint256 usdValue
    );

    /// @notice Event emitted when a user's collateral is absorbed by the protocol
    event AbsorbCollateral(
        address indexed absorber,
        address indexed borrower,
        address indexed asset,
        uint256 collateralAbsorbed,
        uint256 usdValue
    );

    /// @notice Event emitted when a collateral asset is purchased from the protocol
    event BuyCollateral(
        address indexed buyer,
        address indexed asset,
        uint256 baseAmount,
        uint256 collateralAmount
    );

    /// @notice Event emitted when an action is paused/unpaused
    event PauseAction(
        bool supplyPaused,
        bool transferPaused,
        bool withdrawPaused,
        bool absorbPaused,
        bool buyPaused
    );

    /// @notice Event emitted when reserves are withdrawn by the governor
    event WithdrawReserves(address indexed to, uint256 amount);

    function supply(address asset, uint256 amount) external virtual;

    function supplyTo(
        address dst,
        address asset,
        uint256 amount
    ) external virtual;

    function supplyFrom(
        address from,
        address dst,
        address asset,
        uint256 amount
    ) external virtual;

    function transfer(
        address dst,
        uint256 amount
    ) external virtual returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint256 amount
    ) external virtual returns (bool);

    function transferAsset(
        address dst,
        address asset,
        uint256 amount
    ) external virtual;

    function transferAssetFrom(
        address src,
        address dst,
        address asset,
        uint256 amount
    ) external virtual;

    function withdraw(address asset, uint256 amount) external virtual;

    function withdrawTo(
        address to,
        address asset,
        uint256 amount
    ) external virtual;

    function withdrawFrom(
        address src,
        address to,
        address asset,
        uint256 amount
    ) external virtual;

    function approveThis(
        address manager,
        address asset,
        uint256 amount
    ) external virtual;

    function withdrawReserves(address to, uint256 amount) external virtual;

    function absorb(
        address absorber,
        address[] calldata accounts
    ) external virtual;

    function buyCollateral(
        address asset,
        uint256 minAmount,
        uint256 baseAmount,
        address recipient
    ) external virtual;

    function quoteCollateral(
        address asset,
        uint256 baseAmount
    ) public view virtual returns (uint256);

    function getAssetInfo(
        uint8 i
    ) public view virtual returns (AssetInfo memory);

    function getAssetInfoByAddress(
        address asset
    ) public view virtual returns (AssetInfo memory);

    function getCollateralReserves(
        address asset
    ) public view virtual returns (uint256);

    function getReserves() public view virtual returns (int256);

    function getPrice(address priceFeed) public view virtual returns (uint256);

    function isBorrowCollateralized(
        address account
    ) public view virtual returns (bool);

    function isLiquidatable(address account) public view virtual returns (bool);

    function totalSupply() external view virtual returns (uint256);

    function totalBorrow() external view virtual returns (uint256);

    function balanceOf(address owner) public view virtual returns (uint256);

    function borrowBalanceOf(
        address account
    ) public view virtual returns (uint256);

    function pause(
        bool supplyPaused,
        bool transferPaused,
        bool withdrawPaused,
        bool absorbPaused,
        bool buyPaused
    ) external virtual;

    function isSupplyPaused() public view virtual returns (bool);

    function isTransferPaused() public view virtual returns (bool);

    function isWithdrawPaused() public view virtual returns (bool);

    function isAbsorbPaused() public view virtual returns (bool);

    function isBuyPaused() public view virtual returns (bool);

    function accrueAccount(address account) external virtual;

    function getSupplyRate(
        uint256 utilization
    ) public view virtual returns (uint64);

    function getBorrowRate(
        uint256 utilization
    ) public view virtual returns (uint64);

    function getUtilization() public view virtual returns (uint256);

    function governor() external view virtual returns (address);

    function pauseGuardian() external view virtual returns (address);

    function baseToken() external view virtual returns (address);

    function baseTokenPriceFeed() external view virtual returns (address);

    function extensionDelegate() external view virtual returns (address);

    /// @dev uint64
    function supplyKink() external view virtual returns (uint256);

    /// @dev uint64
    function supplyPerSecondInterestRateSlopeLow()
        external
        view
        virtual
        returns (uint256);

    /// @dev uint64
    function supplyPerSecondInterestRateSlopeHigh()
        external
        view
        virtual
        returns (uint256);

    /// @dev uint64
    function supplyPerSecondInterestRateBase()
        external
        view
        virtual
        returns (uint256);

    /// @dev uint64
    function borrowKink() external view virtual returns (uint256);

    /// @dev uint64
    function borrowPerSecondInterestRateSlopeLow()
        external
        view
        virtual
        returns (uint256);

    /// @dev uint64
    function borrowPerSecondInterestRateSlopeHigh()
        external
        view
        virtual
        returns (uint256);

    /// @dev uint64
    function borrowPerSecondInterestRateBase()
        external
        view
        virtual
        returns (uint256);

    /// @dev uint64
    function storeFrontPriceFactor() external view virtual returns (uint256);

    /// @dev uint64
    function baseScale() external view virtual returns (uint256);

    /// @dev uint64
    function trackingIndexScale() external view virtual returns (uint256);

    /// @dev uint64
    function baseTrackingSupplySpeed() external view virtual returns (uint256);

    /// @dev uint64
    function baseTrackingBorrowSpeed() external view virtual returns (uint256);

    /// @dev uint104
    function baseMinForRewards() external view virtual returns (uint256);

    /// @dev uint104
    function baseBorrowMin() external view virtual returns (uint256);

    /// @dev uint104
    function targetReserves() external view virtual returns (uint256);

    function numAssets() external view virtual returns (uint8);

    function decimals() external view virtual returns (uint8);

    function initializeStorage() external virtual;
}

// src/Comet/contracts/CometInterface.sol

/**
 * @title Compound's Comet Interface
 * @notice An efficient monolithic money market protocol
 * @author Compound
 */
abstract contract CometInterface is CometMainInterface, CometExtInterface {

}

// test/oracle.sol

contract Main {
    address cUSDC = 0xc3d688B66703497DAA19211EEdff47f25384cdc3;
    address user1 = address(0x4368927F8621e4965d9509bB28D4F9A2493fac95);
    address GOVERNER = address(0x6d903f6003cca6255D85CcA4D3B5E5146dC33925);
    address WBTC_FEED = address(0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c);
    address WETH_FEED = address(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
    address COMP_FEED = address(0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5);
    address UNI_FEED = address(0x553303d460EE0afB37EdFf9bE42922D8FF63220e);
    address LINK_FEED = address(0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c);
    address USDC_FEED = address(0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6);
    address public USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address public WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public WBTC = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;
    address public UNI = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;
    uint256 public assetPrice = 35000000000;
    int256[] public prices;
    uint256 public endingPrice;
    uint256 public startingPrice;
    uint256 public startingBlock;
    uint256 public simulationTime;
    uint256 public priceDropPerc;
    bool public isPriceDrop;

    constructor(uint256 _simulationDurationInBlocks) {
        startingBlock = block.number;
        simulationTime = _simulationDurationInBlocks - 2;
        priceDropPerc = 47000; //10 == 10000
        isPriceDrop = true;
        // IOracle prevOracleContract = IOracle(
        //     0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        // );
        // (, startingPrice, , , ) = prevOracleContract.latestRoundData();
        startingPrice = 3200_00000000;
        startingPrice = startingPrice;
        if (isPriceDrop) {
            endingPrice =
                (uint256(startingPrice) * priceDropPerc) /
                (1000 * 100);
        } else {
            endingPrice =
                uint256(startingPrice) +
                ((uint256(startingPrice) * priceDropPerc) / (1000 * 100));
        }
    }

    function getCollateralAvailabaleforPurchase()
        public
        view
        returns (uint256)
    {
        uint256 collateralBalance = CometInterface(cUSDC).getCollateralReserves(
            WETH
        );
        uint256 QUOTE_PRICE_SCALE = 1e18;
        uint256 baseScale = CometInterface(cUSDC).baseScale();
        uint256 quotePrice = CometInterface(cUSDC).quoteCollateral(
            WETH,
            QUOTE_PRICE_SCALE * baseScale
        );
        uint256 collateralBalanceInBase = (baseScale *
            QUOTE_PRICE_SCALE *
            collateralBalance) / quotePrice;
        return collateralBalanceInBase;
    }

    function init(uint256 _simulationDurationInBlocks) public {
        startingBlock = block.number;
        simulationTime = _simulationDurationInBlocks;
        priceDropPerc = 47000; //10 == 10000
        isPriceDrop = true;
        startingPrice = 3200_00000000;
        if (isPriceDrop) {
            endingPrice = (startingPrice * priceDropPerc) / (1000 * 100);
        } else {
            endingPrice =
                startingPrice +
                ((startingPrice * priceDropPerc) / (1000 * 100));
        }

        cUSDC = 0xc3d688B66703497DAA19211EEdff47f25384cdc3;
        user1 = address(0x4368927F8621e4965d9509bB28D4F9A2493fac95);
        GOVERNER = address(0x6d903f6003cca6255D85CcA4D3B5E5146dC33925);
        WBTC_FEED = address(0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c);
        WETH_FEED = address(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        COMP_FEED = address(0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5);
        UNI_FEED = address(0x553303d460EE0afB37EdFf9bE42922D8FF63220e);
        LINK_FEED = address(0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c);
        USDC_FEED = address(0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6);
        USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
        WBTC = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;
        UNI = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;
        assetPrice = 35000000000;
    }

    function latestRoundData()
        public
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        uint256 currentBlock = block.number;
        require(
            currentBlock >= startingBlock,
            "Block number is before the simulation starts"
        );

        if (currentBlock >= startingBlock + simulationTime) {
            return (
                0,
                int256(endingPrice),
                block.timestamp,
                block.timestamp,
                0
            );
        }

        uint256 blocksSinceLastDrop = currentBlock -
            startingBlock -
            ((currentBlock - startingBlock) % 5);
        uint256 interpolatedPrice;

        if (isPriceDrop) {
            interpolatedPrice =
                startingPrice -
                ((startingPrice - endingPrice) * blocksSinceLastDrop) /
                simulationTime;
        } else {
            interpolatedPrice =
                startingPrice +
                ((blocksSinceLastDrop) * (endingPrice - startingPrice)) /
                simulationTime;
        }

        // return interpolatedPrice;
        return (
            0,
            int256(interpolatedPrice),
            block.timestamp,
            block.timestamp,
            0
        );
    }
}
