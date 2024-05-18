
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let supplyKink = await cUSDContract.supplyKink();
    console.log("OBSERVER: supplyKink", Number(supplyKink)/1e6);
    return Number(supplyKink)/1e6;
} catch (err) {
    console.log("error in supplyKink", err);
    return err;
}
