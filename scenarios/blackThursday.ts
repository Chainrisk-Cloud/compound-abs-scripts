try {
    const erc20Abi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "authorizer", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nonce", "type": "bytes32" }], "name": "AuthorizationCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "authorizer", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nonce", "type": "bytes32" }], "name": "AuthorizationUsed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_account", "type": "address" }], "name": "Blacklisted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newBlacklister", "type": "address" }], "name": "BlacklisterChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "burner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newMasterMinter", "type": "address" }], "name": "MasterMinterChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "minter", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "minter", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "minterAllowedAmount", "type": "uint256" }], "name": "MinterConfigured", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldMinter", "type": "address" }], "name": "MinterRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "PauserChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newRescuer", "type": "address" }], "name": "RescuerChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_account", "type": "address" }], "name": "UnBlacklisted", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "inputs": [], "name": "CANCEL_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RECEIVE_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "TRANSFER_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "authorizer", "type": "address" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }], "name": "authorizationState", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }], "name": "blacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "blacklister", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "authorizer", "type": "address" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "cancelAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "authorizer", "type": "address" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "cancelAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "minter", "type": "address" }, { "internalType": "uint256", "name": "minterAllowedAmount", "type": "uint256" }], "name": "configureMinter", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currency", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "decrement", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "increment", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "tokenName", "type": "string" }, { "internalType": "string", "name": "tokenSymbol", "type": "string" }, { "internalType": "string", "name": "tokenCurrency", "type": "string" }, { "internalType": "uint8", "name": "tokenDecimals", "type": "uint8" }, { "internalType": "address", "name": "newMasterMinter", "type": "address" }, { "internalType": "address", "name": "newPauser", "type": "address" }, { "internalType": "address", "name": "newBlacklister", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newName", "type": "string" }], "name": "initializeV2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "lostAndFound", "type": "address" }], "name": "initializeV2_1", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accountsToBlacklist", "type": "address[]" }, { "internalType": "string", "name": "newSymbol", "type": "string" }], "name": "initializeV2_2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }], "name": "isBlacklisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isMinter", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterMinter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "minter", "type": "address" }], "name": "minterAllowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pauser", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "receiveWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "receiveWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "minter", "type": "address" }], "name": "removeMinter", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "tokenContract", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "rescueERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rescuer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "transferWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "transferWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }], "name": "unBlacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newBlacklister", "type": "address" }], "name": "updateBlacklister", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newMasterMinter", "type": "address" }], "name": "updateMasterMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newPauser", "type": "address" }], "name": "updatePauser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newRescuer", "type": "address" }], "name": "updateRescuer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }]
    const cABI = [{ "inputs": [{ "components": [{ "internalType": "address", "name": "governor", "type": "address" }, { "internalType": "address", "name": "pauseGuardian", "type": "address" }, { "internalType": "address", "name": "baseToken", "type": "address" }, { "internalType": "address", "name": "baseTokenPriceFeed", "type": "address" }, { "internalType": "address", "name": "extensionDelegate", "type": "address" }, { "internalType": "uint64", "name": "supplyKink", "type": "uint64" }, { "internalType": "uint64", "name": "supplyPerYearInterestRateSlopeLow", "type": "uint64" }, { "internalType": "uint64", "name": "supplyPerYearInterestRateSlopeHigh", "type": "uint64" }, { "internalType": "uint64", "name": "supplyPerYearInterestRateBase", "type": "uint64" }, { "internalType": "uint64", "name": "borrowKink", "type": "uint64" }, { "internalType": "uint64", "name": "borrowPerYearInterestRateSlopeLow", "type": "uint64" }, { "internalType": "uint64", "name": "borrowPerYearInterestRateSlopeHigh", "type": "uint64" }, { "internalType": "uint64", "name": "borrowPerYearInterestRateBase", "type": "uint64" }, { "internalType": "uint64", "name": "storeFrontPriceFactor", "type": "uint64" }, { "internalType": "uint64", "name": "trackingIndexScale", "type": "uint64" }, { "internalType": "uint64", "name": "baseTrackingSupplySpeed", "type": "uint64" }, { "internalType": "uint64", "name": "baseTrackingBorrowSpeed", "type": "uint64" }, { "internalType": "uint104", "name": "baseMinForRewards", "type": "uint104" }, { "internalType": "uint104", "name": "baseBorrowMin", "type": "uint104" }, { "internalType": "uint104", "name": "targetReserves", "type": "uint104" }, { "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "priceFeed", "type": "address" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint64", "name": "borrowCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidateCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidationFactor", "type": "uint64" }, { "internalType": "uint128", "name": "supplyCap", "type": "uint128" }], "internalType": "struct CometConfiguration.AssetConfig[]", "name": "assetConfigs", "type": "tuple[]" }], "internalType": "struct CometConfiguration.Configuration", "name": "config", "type": "tuple" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "Absurd", "type": "error" }, { "inputs": [], "name": "AlreadyInitialized", "type": "error" }, { "inputs": [], "name": "BadAsset", "type": "error" }, { "inputs": [], "name": "BadDecimals", "type": "error" }, { "inputs": [], "name": "BadDiscount", "type": "error" }, { "inputs": [], "name": "BadMinimum", "type": "error" }, { "inputs": [], "name": "BadPrice", "type": "error" }, { "inputs": [], "name": "BorrowCFTooLarge", "type": "error" }, { "inputs": [], "name": "BorrowTooSmall", "type": "error" }, { "inputs": [], "name": "InsufficientReserves", "type": "error" }, { "inputs": [], "name": "InvalidInt104", "type": "error" }, { "inputs": [], "name": "InvalidInt256", "type": "error" }, { "inputs": [], "name": "InvalidUInt104", "type": "error" }, { "inputs": [], "name": "InvalidUInt128", "type": "error" }, { "inputs": [], "name": "InvalidUInt64", "type": "error" }, { "inputs": [], "name": "LiquidateCFTooLarge", "type": "error" }, { "inputs": [], "name": "NegativeNumber", "type": "error" }, { "inputs": [], "name": "NoSelfTransfer", "type": "error" }, { "inputs": [], "name": "NotCollateralized", "type": "error" }, { "inputs": [], "name": "NotForSale", "type": "error" }, { "inputs": [], "name": "NotLiquidatable", "type": "error" }, { "inputs": [], "name": "Paused", "type": "error" }, { "inputs": [], "name": "SupplyCapExceeded", "type": "error" }, { "inputs": [], "name": "TimestampTooLarge", "type": "error" }, { "inputs": [], "name": "TooManyAssets", "type": "error" }, { "inputs": [], "name": "TooMuchSlippage", "type": "error" }, { "inputs": [], "name": "TransferInFailed", "type": "error" }, { "inputs": [], "name": "TransferOutFailed", "type": "error" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "absorber", "type": "address" }, { "indexed": true, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "collateralAbsorbed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "usdValue", "type": "uint256" }], "name": "AbsorbCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "absorber", "type": "address" }, { "indexed": true, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "basePaidOut", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "usdValue", "type": "uint256" }], "name": "AbsorbDebt", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "baseAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "collateralAmount", "type": "uint256" }], "name": "BuyCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "supplyPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "transferPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "withdrawPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "absorbPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "buyPaused", "type": "bool" }], "name": "PauseAction", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Supply", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "SupplyCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrawCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrawReserves", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "address", "name": "absorber", "type": "address" }, { "internalType": "address[]", "name": "accounts", "type": "address[]" }], "name": "absorb", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "accrueAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "manager", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approveThis", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseBorrowMin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseMinForRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseTokenPriceFeed", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseTrackingBorrowSpeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseTrackingSupplySpeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "borrowBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowKink", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowPerSecondInterestRateBase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowPerSecondInterestRateSlopeHigh", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowPerSecondInterestRateSlopeLow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "minAmount", "type": "uint256" }, { "internalType": "uint256", "name": "baseAmount", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "buyCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "extensionDelegate", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "i", "type": "uint8" }], "name": "getAssetInfo", "outputs": [{ "components": [{ "internalType": "uint8", "name": "offset", "type": "uint8" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "priceFeed", "type": "address" }, { "internalType": "uint64", "name": "scale", "type": "uint64" }, { "internalType": "uint64", "name": "borrowCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidateCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidationFactor", "type": "uint64" }, { "internalType": "uint128", "name": "supplyCap", "type": "uint128" }], "internalType": "struct CometCore.AssetInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getAssetInfoByAddress", "outputs": [{ "components": [{ "internalType": "uint8", "name": "offset", "type": "uint8" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "priceFeed", "type": "address" }, { "internalType": "uint64", "name": "scale", "type": "uint64" }, { "internalType": "uint64", "name": "borrowCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidateCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidationFactor", "type": "uint64" }, { "internalType": "uint128", "name": "supplyCap", "type": "uint128" }], "internalType": "struct CometCore.AssetInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "utilization", "type": "uint256" }], "name": "getBorrowRate", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getCollateralReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "utilization", "type": "uint256" }], "name": "getSupplyRate", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUtilization", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "governor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "manager", "type": "address" }], "name": "hasPermission", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initializeStorage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "isAbsorbPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "isAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isBorrowCollateralized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isBuyPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isLiquidatable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isSupplyPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isTransferPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isWithdrawPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "liquidatorPoints", "outputs": [{ "internalType": "uint32", "name": "numAbsorbs", "type": "uint32" }, { "internalType": "uint64", "name": "numAbsorbed", "type": "uint64" }, { "internalType": "uint128", "name": "approxSpend", "type": "uint128" }, { "internalType": "uint32", "name": "_reserved", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numAssets", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "supplyPaused", "type": "bool" }, { "internalType": "bool", "name": "transferPaused", "type": "bool" }, { "internalType": "bool", "name": "withdrawPaused", "type": "bool" }, { "internalType": "bool", "name": "absorbPaused", "type": "bool" }, { "internalType": "bool", "name": "buyPaused", "type": "bool" }], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pauseGuardian", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "baseAmount", "type": "uint256" }], "name": "quoteCollateral", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "storeFrontPriceFactor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "supply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "supplyFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "supplyKink", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "supplyPerSecondInterestRateBase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "supplyPerSecondInterestRateSlopeHigh", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "supplyPerSecondInterestRateSlopeLow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "supplyTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "targetReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalBorrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "totalsCollateral", "outputs": [{ "internalType": "uint128", "name": "totalSupplyAsset", "type": "uint128" }, { "internalType": "uint128", "name": "_reserved", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "trackingIndexScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferAsset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferAssetFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userBasic", "outputs": [{ "internalType": "int104", "name": "principal", "type": "int104" }, { "internalType": "uint64", "name": "baseTrackingIndex", "type": "uint64" }, { "internalType": "uint64", "name": "baseTrackingAccrued", "type": "uint64" }, { "internalType": "uint16", "name": "assetsIn", "type": "uint16" }, { "internalType": "uint8", "name": "_reserved", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userCollateral", "outputs": [{ "internalType": "uint128", "name": "balance", "type": "uint128" }, { "internalType": "uint128", "name": "_reserved", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawReserves", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
    const oracleAbi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_simulationDurationInBlocks",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "UNI",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "USDC",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "WBTC",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "WETH",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "assetPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "endingPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCollateralAvailabaleforPurchase",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_simulationDurationInBlocks",
                    "type": "uint256"
                }
            ],
            "name": "init",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isPriceDrop",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "latestRoundData",
            "outputs": [
                {
                    "internalType": "uint80",
                    "name": "roundId",
                    "type": "uint80"
                },
                {
                    "internalType": "int256",
                    "name": "answer",
                    "type": "int256"
                },
                {
                    "internalType": "uint256",
                    "name": "startedAt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "updatedAt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint80",
                    "name": "answeredInRound",
                    "type": "uint80"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "priceDropPerc",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "prices",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "simulationTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "startingBlock",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "startingPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const WBTC_FEED = "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c";
    const WETH_FEED = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    const cUSDC = "0xc3d688B66703497DAA19211EEdff47f25384cdc3";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    const SUPPLIERS = ["0x90b22d42d42edd823535427f524ec70023070469",
        "0xab92fca834aac2afe16cf6a2fc60cc7a864a77a5",
        "0x5de64f9503064344db3202d95ceb73c420dccd57",
        "0x064980edd7d43abee781f49a4e31c06df05ecccb",
        "0x9453817bf3a9d0cb124c8cfc13e90a5967ec0c7d",
        "0x3cd8a9f27a241f8a32153d95590aacc8202b6641"];
    // const SUPPLIERS = ["0x42c8e43048f6ff3586945a1fd23e0bec540dcd07"];
    const liquidatorAddress = "0x4B16c5dE96EB2117bBE5fd171E4d203624B014aa";
    await provider.send("hardhat_setBalance", [liquidatorAddress, "0xfffffffffffffffffff56BC75E2D63100000"]);


    let oracleContract = deployedContracts.Main;
    let wbtcFeed = new ethers.Contract(WBTC_FEED, oracleAbi, provider);
    let wethFeed = new ethers.Contract(WETH_FEED, oracleAbi, provider);
    let liquidator = await ethers.getImpersonatedSigner(liquidatorAddress);
    let code = await provider.getCode(oracleContract.address);
    await provider.send("hardhat_setCode", [
        WBTC_FEED,
        code,
    ]);
    await provider.send("hardhat_setCode", [
        WETH_FEED,
        code,
    ]);
    await provider.send("evm_mine");
    await wbtcFeed.connect(liquidator).init(1000);
    await wethFeed.connect(liquidator).init(1000);
    let cUSDContract = new ethers.Contract(cUSDC, cABI, provider);
    let usdcContract = new ethers.Contract(USDC, erc20Abi, provider);
    await usdcContract.connect(liquidator).approve(cUSDC, "1000000000000000000000");
    console.log("SCENARIO EXECUTION COMPLETED");
    console.log("WETHFEED CHECK", await wethFeed.latestRoundData());
    console.log("WBTCFEED CHECK", await wbtcFeed.latestRoundData());


    return {
        oracleContract,
        liquidator,
        cUSDContract,
        usdcContract,
        WBTC_FEED,
        WETH_FEED,
        cUSDC,
        USDC,
        WETH,
        WBTC,
        UNI,
        SUPPLIERS
    }

} catch (err) {
    console.log("Error in Scenario", err);
    return err;
}