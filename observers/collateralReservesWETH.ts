
try {
    let WETH = scenarioRet.WETH;
    let cUSDContract = scenarioRet.cUSDContract;
    let collateralReserves = await cUSDContract.getCollateralReserves(WETH);
    console.log("OBSERVER: collateralReserves WETH", Number(collateralReserves));
    return Number(collateralReserves);
} catch (err) {
    console.log("error in collateralReserves WETH", err);
    return err;
}