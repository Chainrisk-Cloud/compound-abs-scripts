
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let targetReserve = await cUSDContract.targetReserves();
    console.log("OBSERVER: targetReserve", Number(targetReserve)/1e6);
    return Number(targetReserve)/1e6;
} catch (err) {
    console.log("error in target reserves", err);
    return err;
}
