
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let totalSupply = await cUSDContract.totalSupply();
    console.log("OBSERVER: totalSupply", Number(totalSupply)/1e6);
    return Number(totalSupply)/1e6;
} catch (err) {
    console.log("error in totalSupply", err);
    return err;
}