# Colony Metrics Subgraph

SubGraph for indexing Colony on chain events and providing key colony network metrics.

## Installation

First, clone this repository :)

### Install packages

Pick the right node version (as seen in `.nvmrc`):

```bash
nvm use
```

Install all dependencies:

```bash
npm install
```

### Provision dependent libraries and build contracts

This project depends on external libraries, so after cloning, they need to be provisioned:
```bash
npm run provision
```

### SubGraph Local

Build and deploy the subgraph locally
```
npm run codegen

npm run create-local

npm run deploy-local
```

### SubGraph Deploy

Build and deploy the subgraph locally
```
npm run deploy-network
```

### Example Query

```
{
  colonyMetricsDailies(first: 5, orderBy: date, orderDirection: desc) {
    id
    date
    colonies
    newColonies
    domains
    totalTokens
    totalUnlockedTokens
  }
  colonyMetrics(id: 1) {
    id
    colonies
    domains
    totalTokens
    totalUnlockedTokens
  }
  votingReputationExtensions(first: 5) {
    id
    installs
    uninstalled
    initialised
    motions
    motionsStaked
  }
}
```