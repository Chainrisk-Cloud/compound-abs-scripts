
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let utilization = await cUSDContract.getUtilization();
    console.log("OBSERVER: utilization", Number(utilization)/1e6);
    return Number(utilization)/1e6;
} catch (err) {
    console.log("error in totalSupply", err);
    return err;
}