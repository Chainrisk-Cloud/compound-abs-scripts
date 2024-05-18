
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let reserves = await cUSDContract.getReserves();
    console.log("OBSERVER: reserves", Number(reserves)/1e6);
    return Number(reserves)/1e6;
} catch (err) {
    console.log("error in reserves", err);
    return err;
}
