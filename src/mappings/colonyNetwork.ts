import {
  ColonyAdded,
  ExtensionInstalled,
  ExtensionUninstalled,
  ExtensionDeprecated,
} from '../../generated/ColonyNetwork/IColonyNetwork';

import { ZERO_BI, ZERO_BD, ONE_BI } from '../utils';

import {
  ColonyMetrics,
  ColonyMetricsDaily
} from '../../generated/schema';

import { createToken } from './token';
import { getHandleExtensionDeprecated, getHandleExtensionInstalled, getHandleExtensionUninstalled } from './extensions';

export function handleColonyAdded(event: ColonyAdded): void {
  let colonyMetrics = getColonyMetrics(event);
  let colonyMetricsDaily = getColonyMetricsDaily(event);

  // Create the new token
  let tokenAddress = event.params.token.toHexString();
  createToken(tokenAddress);

  colonyMetrics.colonies = colonyMetrics.colonies.plus(ONE_BI);
  colonyMetrics.save();
  // Daily
  colonyMetricsDaily.colonies = colonyMetricsDaily.colonies.plus(ONE_BI);
  colonyMetricsDaily.save();
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

export function getColonyMetrics(event: any) : ColonyMetrics {
  // Load ColonyMetrics
  let colonyMetrics = ColonyMetrics.load('1');

  // If there is no ColonyMetrics, create it now
  if(colonyMetrics == null){
    colonyMetrics = new ColonyMetrics('1');

    colonyMetrics.colonies = ZERO_BI;
    colonyMetrics.nativeAUM = ZERO_BD;
    colonyMetrics.usdAUM = ZERO_BD;
    colonyMetrics.nativeVolume = ZERO_BD;
    colonyMetrics.usdVolume = ZERO_BD;
    colonyMetrics.tokens = [];
    colonyMetrics.totalTokens = ZERO_BI;
    colonyMetrics.totalUnlockedTokens = ZERO_BI;
    colonyMetrics.domains = ZERO_BI;
  }

  colonyMetrics.block = event.block.number;

  colonyMetrics.save();
  return <ColonyMetrics>colonyMetrics;
}

export function getColonyMetricsDaily(event: any) : ColonyMetricsDaily {
  // Load ColonyMetrics Daily
  let colonyMetrics = ColonyMetrics.load('1');
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  // Load CoinMachineExtension
  let colonyMetricsDaily = ColonyMetricsDaily.load(dayID.toString());

  // If there is no ColonyMetrics Daily, create it now
  if(colonyMetricsDaily == null){
    colonyMetricsDaily = new ColonyMetricsDaily(dayID.toString());

    colonyMetricsDaily.colonies = colonyMetrics.colonies;
    colonyMetricsDaily.newColonies = ZERO_BI;
    colonyMetricsDaily.nativeAUM = colonyMetrics.nativeAUM;
    colonyMetricsDaily.usdAUM = colonyMetrics.usdAUM;
    colonyMetricsDaily.nativeVolume = ZERO_BD;
    colonyMetricsDaily.usdVolume = ZERO_BD;
    colonyMetricsDaily.tokens = [];
    colonyMetricsDaily.totalTokens = colonyMetrics.totalTokens;
    colonyMetricsDaily.totalUnlockedTokens = colonyMetrics.totalUnlockedTokens;
    colonyMetricsDaily.domains = colonyMetrics.domains;
  }

  colonyMetricsDaily.block = event.block.number;

  colonyMetricsDaily.save();
  return <ColonyMetricsDaily>colonyMetricsDaily;
}