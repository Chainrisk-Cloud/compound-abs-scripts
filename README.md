# Black Thursday Simulation for Compound V3

The simulation will focus on a 53% price decline for WETH (over a period of 1000 blocks ) within the USDC market on the Ethereum chain. The USDC market in the Ethereum chain has a total value locked (TVL) of approximately $1 billion and a wrapped Ether (WETH) holds a significant share with the supply of roughly $440 million. ( As of May 9, 2024)

The Chainrisk Cloud platform specifically targets the Compound V3 Price Oracle, which relies on Chainlink's Price Feed. By altering the return values of this oracle, the simulation mimics the price drop associated with a Black Thursday event for the WETH asset.

To effectively use the Chainrisk simulator for ABS simulation, scripts are divided into five main modules:

- **Agents**: Agents emulate the user behaviour in the simulations like liquidators, borrowers, suppliers, arbitrageurs and attacker ( in case of economic exploit simulation ). 

- **Scenarios**: Scenarios scripts create the environment for the simulation like signing the transactions, funding wallets, changing the values of the risk parameters, etc 

- **Observers**: Observer scripts monitor the state of the blockchain during the course of simulation and accordingly, generates the visualisation library.

- **Assertions**: Assertion scripts are discrete arithmetic statements which checks if certain functions are being performed properly ( returns a boolean value ) 

- **Contracts**: Contract scripts are custom solidity contracts that needs to deployed like flash loan contract, dummy oracle contract etc for the simulation.

## Demo Video

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/JcS5pswau-0/0.jpg)](https://www.youtube.com/watch?v=JcS5pswau-0)

## Documentation

All the documentation can be found here - [Documentation](https://chainrisk.gitbook.io/compound-risk-assessment)


