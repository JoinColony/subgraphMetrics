import {
  ColonyAdded,
  ExtensionInstalled,
  ExtensionUninstalled,
  ExtensionDeprecated,
} from '../../generated/ColonyNetwork/IColonyNetwork';
import { Colony as ColonyTemplate } from '../../generated/templates'

import { ZERO_BI, ZERO_BD, ONE_BI } from '../utils';

import {
  ColoniesDaily,
  Colony,
  ColonyMetrics,
  ColonyMetricsDaily
} from '../../generated/schema';

import { getToken } from './token';
import { getHandleExtensionDeprecated, getHandleExtensionInstalled, getHandleExtensionUninstalled } from './extensions';
import { Address, ethereum } from '@graphprotocol/graph-ts';

export function handleColonyAdded(event: ColonyAdded): void {
  let colonyMetrics = getColonyMetrics(event);
  let colonyMetricsDaily = getColonyMetricsDaily(event);

  // Create the new token
  let tokenAddress = event.params.token.toHexString();
  getToken(tokenAddress, event);

  colonyMetrics.colonies = colonyMetrics.colonies.plus(ONE_BI);
  colonyMetrics.save();
  // Daily
  colonyMetricsDaily.colonies = colonyMetrics.colonies;
  colonyMetricsDaily.newColonies = colonyMetricsDaily.newColonies.plus(ONE_BI);
  colonyMetricsDaily.save();

  getColonies(event);
  getColoniesDaily(event);

  // Instantiate template
  ColonyTemplate.create(event.params.colonyAddress)
}

export function handleExtensionInstalled(event: ExtensionInstalled): void {
  getHandleExtensionInstalled(event);
}

export function handleExtensionUninstalled(event: ExtensionUninstalled): void {
  getHandleExtensionUninstalled(event);
}

export function handleExtensionDeprecated(event: ExtensionDeprecated): void {
  getHandleExtensionDeprecated(event);
}

export function getColonyMetrics(event: ethereum.Event) : ColonyMetrics {
  // Load ColonyMetrics
  let colonyMetrics = ColonyMetrics.load('1');

  // If there is no ColonyMetrics, create it now
  if(colonyMetrics == null){
    colonyMetrics = new ColonyMetrics('1');

    colonyMetrics.colonies = ZERO_BI;
    colonyMetrics.nativeAssets = ZERO_BD;
    colonyMetrics.usdAssets = ZERO_BD;
    colonyMetrics.nativeVolume = ZERO_BD;
    colonyMetrics.usdVolume = ZERO_BD;
    colonyMetrics.tokens = [];
    colonyMetrics.totalTokens = ZERO_BI;
    colonyMetrics.totalUnlockedTokens = ZERO_BI;
    colonyMetrics.totalTransactions = ZERO_BI;
    colonyMetrics.totalTransactionsValue = ZERO_BD;
    colonyMetrics.totalFeesCount = ZERO_BI;
    colonyMetrics.totalFeesValueUSD = ZERO_BD;
    colonyMetrics.usdVolume = ZERO_BD;
    colonyMetrics.domains = ZERO_BI;
  }

  colonyMetrics.block = event.block.number;

  colonyMetrics.save();
  return <ColonyMetrics>colonyMetrics;
}

export function getColonyMetricsDaily(event: ethereum.Event) : ColonyMetricsDaily {
  // Load ColonyMetrics Daily
  let colonyMetrics = ColonyMetrics.load('1');
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  // Load Colony Daily Metrics
  let colonyMetricsDaily = ColonyMetricsDaily.load(dayID.toString());

  // If there is no ColonyMetrics Daily, create it now
  if(colonyMetricsDaily == null){
    colonyMetricsDaily = new ColonyMetricsDaily(dayID.toString());
    colonyMetricsDaily.date = timestamp;
    colonyMetricsDaily.colonies = ZERO_BI;
    colonyMetricsDaily.newColonies = ZERO_BI;
    colonyMetricsDaily.nativeAssets = ZERO_BD;
    colonyMetricsDaily.usdAssets = ZERO_BD;
    colonyMetricsDaily.nativeVolume = ZERO_BD;
    colonyMetricsDaily.usdVolume = ZERO_BD;
    colonyMetricsDaily.tokens = [];
    colonyMetricsDaily.totalTokens = ZERO_BI;
    colonyMetricsDaily.totalUnlockedTokens = ZERO_BI;
    colonyMetricsDaily.totalTransactions = ZERO_BI;
    colonyMetricsDaily.totalTransactionsValue = ZERO_BD;
    colonyMetricsDaily.totalFeesCount = ZERO_BI;
    colonyMetricsDaily.totalFeesValueUSD = ZERO_BD;
    colonyMetricsDaily.domains = ZERO_BI;
  }

  colonyMetricsDaily.block = event.block.number;

  colonyMetricsDaily.save();
  return <ColonyMetricsDaily>colonyMetricsDaily;
}

// On new colony creation tracking each Colony
export function getColonies(event: ColonyAdded) : Colony {
  // Load ColonyMetrics
  const colonyAddress = event.params.colonyAddress;
  const timestamp = event.block.timestamp.toI32();
  let colony = Colony.load(colonyAddress.toHex());

  // If there is no ColonyMetrics, create it now
  if(colony == null){
    colony = new Colony(colonyAddress.toHexString());
    colony.nativeAssets = ZERO_BD;
    colony.usdAssets = ZERO_BD;
    colony.nativeVolume = ZERO_BD;
    colony.usdVolume = ZERO_BD;
    colony.tokens = [];
    colony.totalTransactions = ZERO_BI;
    colony.totalTransactionsValue = ZERO_BD;
    colony.totalFeesCount = ZERO_BI;
    colony.totalFeesValueUSD = ZERO_BD;
    colony.domains = ZERO_BI;
    colony.created = timestamp;
  }

  colony.save();
  return <Colony>colony;
}

// Tracking each Colony's daily stats
// NOTE: Overkill maybe, but used to identify if 
export function getColoniesDaily(event: ColonyAdded) : ColoniesDaily {
  // Load ColonyMetrics
  const colonyAddress: Address = event.params.colonyAddress;
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;

  // Load Colony's Daily Metrics
  let colonyDailies = ColoniesDaily.load(colonyAddress.toString() + '_' + dayID.toString());

  // If there is no ColonyMetrics, create it now
  if(colonyDailies == null){
    // Create id with address and date
    colonyDailies = new ColoniesDaily(colonyAddress.toString() + '_' + dayID.toString());
    colonyDailies.nativeAssets = ZERO_BD;
    colonyDailies.usdAssets = ZERO_BD;
    colonyDailies.nativeVolume = ZERO_BD;
    colonyDailies.usdVolume = ZERO_BD;
    colonyDailies.tokens = [];
    colonyDailies.totalTransactions = ZERO_BI;
    colonyDailies.totalTransactionsValue = ZERO_BD;
    colonyDailies.totalFeesCount = ZERO_BI;
    colonyDailies.totalFeesValueUSD = ZERO_BD;
    colonyDailies.domains = ZERO_BI;
    colonyDailies.date = timestamp;
  }

  colonyDailies.save();
  return <ColoniesDaily>colonyDailies;
}