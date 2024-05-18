
try {
    let cUSDContract = scenarioRet.cUSDContract;
    let SUPPLIERS = scenarioRet.SUPPLIERS;
    let borrowBalancePromises = [];
    for (let i = 0; i < SUPPLIERS.length; i++) {
        borrowBalancePromises.push(cUSDContract.borrowBalanceOf(SUPPLIERS[i]));
    }
    let borrowBalances = await Promise.all(borrowBalancePromises);
    let borrowBalanceObj = {};
    if (borrowBalances.length == SUPPLIERS.length) {
        for (let i = 0; i < borrowBalances.length; i++) {
            borrowBalanceObj[SUPPLIERS[i].toString()] = (borrowBalances[i]) / 1e6
        }
        let currentBlock = await provider.getBlockNumber();
        borrowBalanceObj["blockNumber"] = currentBlock;
    }
    console.log("OBSERVER: borrowBalance", borrowBalanceObj);
    return borrowBalanceObj;


} catch (err) {
    console.log("error in borrowBalance", err);
    return err;
}