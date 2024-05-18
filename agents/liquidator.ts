
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let cUSDC = scenarioRet.cUSDC;
    let WBTC = scenarioRet.WBTC;
    let WETH = scenarioRet.WETH;
    let SUPPLIERS = scenarioRet.SUPPLIERS;
    let usdcContract = scenarioRet.usdcContract;
    let liquidator = scenarioRet.liquidator;
    let oracleContract = scenarioRet.oracleContract;
    await usdcContract.connect(liquidator).approve(cUSDC, "1000000000000000000000000");
    let liquidatableUsers = [];
    for (let i = 0; i < SUPPLIERS.length; i++) {
        let isUserLiquidable = await cUSDContract.isLiquidatable(SUPPLIERS[i]);
        let isborrowcollateralized = await cUSDContract.isBorrowCollateralized(SUPPLIERS[i]);
        console.log("isUserLiquidable",isUserLiquidable);
        if (isUserLiquidable == true && isborrowcollateralized == false) {
            liquidatableUsers.push(SUPPLIERS[i]);
        }

        let collateralBalanceInBase = await oracleContract.getCollateralAvailabaleforPurchase();
        let quoteWethCollateral = await cUSDContract.quoteCollateral(WETH, collateralBalanceInBase);
        let collateralReserve = await cUSDContract.getCollateralReserves(WETH);
        console.log("quoteWethCollateral, collateralReserve", quoteWethCollateral, collateralReserve,quoteWethCollateral < collateralReserve);
            await cUSDContract.connect(liquidator).absorb(liquidator.address, liquidatableUsers);
            console.log("collateralBalanceInBase", collateralBalanceInBase);
            await cUSDContract.connect(liquidator).buyCollateral(WETH, 0, collateralBalanceInBase.toString(), liquidator.address);
    }

    console.log("AGENT EXECUTION COMPLETED");

} catch (err) {
    // const revertData = err.data.data
    // const decodedError = myContract.interface.parseError(revertData)
    // console.log("Transaction failed",decodedError.name);
    console.log("error in agent", err);
}