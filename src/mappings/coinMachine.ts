import { ethereum } from '@graphprotocol/graph-ts';
import { ExtensionDeprecated, ExtensionInstalled, ExtensionUninstalled } from '../../generated/ColonyNetwork/IColonyNetwork';
import { CoinMachineExtension, CoinMachineExtensionDaily } from '../../generated/schema';

import {
  ExtensionInitialised,
  TokensBought,
} from '../../generated/templates/CoinMachine/CoinMachine';

import { ZERO_BI, ZERO_BD, ONE_BI } from '../utils';

export function handleExtensionInitialised(event: ExtensionInitialised): void {
  let coinMachineExtension = getCoinMachineExtension(event);
  coinMachineExtension.initialised = coinMachineExtension.initialised.plus(ONE_BI);
  coinMachineExtension.save();
  // Daily
  let coinMachineExtensionDaily = getCoinMachineExtensionDaily(event);
  coinMachineExtensionDaily.initialised = coinMachineExtensionDaily.initialised.plus(ONE_BI);
  coinMachineExtensionDaily.save();
}

export function handleTokensBought(event: TokensBought): void {
  let coinMachineExtension = getCoinMachineExtension(event);
  coinMachineExtension.tokenBuys = coinMachineExtension.tokenBuys.plus(ONE_BI);
  coinMachineExtension.save();
  // Daily
  let coinMachineExtensionDaily = getCoinMachineExtensionDaily(event);
  coinMachineExtensionDaily.tokenBuys = coinMachineExtensionDaily.tokenBuys.plus(ONE_BI);
  coinMachineExtensionDaily.save();
}

export function getCoinMachineExtension(event: ethereum.Event) : CoinMachineExtension {
  // Load CoinMachineExtension
  let coinMachineExtension = CoinMachineExtension.load('1');

  // If there is no CoinMachineExtension, create it now
  if(coinMachineExtension == null){
    coinMachineExtension = new CoinMachineExtension('1');

    coinMachineExtension.installs = ZERO_BI;
    coinMachineExtension.initialised = ZERO_BI;
    coinMachineExtension.depreciated = ZERO_BI;
    coinMachineExtension.uninstalled = ZERO_BI;
    coinMachineExtension.fundsRaisedNative = ZERO_BD;
    coinMachineExtension.fundsRaisedUSD = ZERO_BD;
    coinMachineExtension.tokens = [];
    coinMachineExtension.tokenBuys = ZERO_BI;
  }

  coinMachineExtension.save();
  return <CoinMachineExtension>coinMachineExtension;
}

export function getCoinMachineExtensionDaily(event: ethereum.Event) : CoinMachineExtensionDaily {
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  // Load CoinMachineExtension
  let coinMachineExtensionDaily = CoinMachineExtensionDaily.load(dayID.toString());

  // If there is no CoinMachineExtension, create it now
  if(coinMachineExtensionDaily == null){
    coinMachineExtensionDaily = new CoinMachineExtensionDaily(dayID.toString());

    coinMachineExtensionDaily.installs = ZERO_BI;
    coinMachineExtensionDaily.initialised = ZERO_BI;
    coinMachineExtensionDaily.depreciated = ZERO_BI;
    coinMachineExtensionDaily.uninstalled = ZERO_BI;
    coinMachineExtensionDaily.fundsRaisedNative = ZERO_BD;
    coinMachineExtensionDaily.fundsRaisedUSD = ZERO_BD;
    coinMachineExtensionDaily.tokens = [];
    coinMachineExtensionDaily.tokenBuys = ZERO_BI;
  }

  coinMachineExtensionDaily.save();
  return <CoinMachineExtensionDaily>coinMachineExtensionDaily;
}