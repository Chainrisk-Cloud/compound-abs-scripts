
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let totalBorrow = await cUSDContract.totalBorrow();
    console.log("OBSERVER: totalBorrow", Number(totalBorrow)/1e6);
    return Number(totalBorrow)/1e6;
} catch (err) {
    console.log("error in totalBorrow", err);
    return err;
}