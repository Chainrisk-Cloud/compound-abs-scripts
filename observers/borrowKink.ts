
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let borrowKink = await cUSDContract.borrowKink();
    console.log("OBSERVER: borrowKink", Number(borrowKink)/1e6);
    return Number(borrowKink)/1e6;
} catch (err) {
    console.log("error in borrowKink", err);
    return err;
}
