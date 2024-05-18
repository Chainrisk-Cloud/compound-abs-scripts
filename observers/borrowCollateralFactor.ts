try {
    let cUSDContract = scenarioRet.cUSDContract;
    let WETH = scenarioRet.WETH;
    let assetInfo = await cUSDContract.getAssetInfoByAddress(WETH);
    console.log("OBSERVER: Borrow Collateral Factor", Number(assetInfo[4]) / 1e18);
    return (assetInfo[4] / 1e18);
} catch (err) {
    console.log("err in Borrow Collateral Factor", err);
}