
try {
    let WBTC = scenarioRet.WBTC;
    let cUSDContract = scenarioRet.cUSDContract;
    let collateralReserves = await cUSDContract.getCollateralReserves(WBTC);
    console.log("OBSERVER: collateralReserves WBTC", Number(collateralReserves));
    return Number(collateralReserves);
} catch (err) {
    console.log("error in collateralReserves WBTC", err);
    return err;
}