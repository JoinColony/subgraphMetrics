import { crypto, ByteArray } from '@graphprotocol/graph-ts';

import {
  ColonyAdded,
  ExtensionInstalled,
} from '../../generated/ColonyNetwork/IColonyNetwork';

import { ZERO_BI, ZERO_BD, ONE_BI } from '../utils';

import {
  ColonyMetrics,
  ColonyMetricsDaily
} from '../../generated/schema';

import { createToken } from './token';
import { getCoinMachineExtension, getCoinMachineExtensionDaily } from './coinMachine';
import { getOneTxPaymentExtension, getOneTxPaymentExtensionDaily } from './oneTxPayment';
import { getVotingReputationExtension, getVotingReputationExtensionDaily } from './votingReputation';
import { getWhitelistExtension, getWhitelistExtensionDaily } from './whitelist';

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
  let ONE_TX_PAYMENT = crypto.keccak256(ByteArray.fromUTF8("OneTxPayment")).toHexString()
  let COIN_MACHINE = crypto.keccak256(ByteArray.fromUTF8("CoinMachine")).toHexString()
  let VOTING_REPUTATION = crypto.keccak256(ByteArray.fromUTF8("VotingReputation")).toHexString()
  let WHITELIST = crypto.keccak256(ByteArray.fromUTF8("Whitelist")).toHexString()

  if (event.params.extensionId.toHexString() == ONE_TX_PAYMENT) {
    let oneTxPaymentExtension = getOneTxPaymentExtension(event);
    oneTxPaymentExtension.installs = oneTxPaymentExtension.installs.plus(ONE_BI);
    oneTxPaymentExtension.save();
    // Daily
    let oneTxPaymentExtensionDaily = getOneTxPaymentExtensionDaily(event);
    oneTxPaymentExtensionDaily.installs = oneTxPaymentExtensionDaily.installs.plus(ONE_BI);
    oneTxPaymentExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == COIN_MACHINE) {
    let coinMachineExtension = getCoinMachineExtension(event);
    coinMachineExtension.installs = coinMachineExtension.installs.plus(ONE_BI);
    coinMachineExtension.save();
    // Daily
    let coinMachineExtensionDaily = getCoinMachineExtensionDaily(event);
    coinMachineExtensionDaily.installs = coinMachineExtensionDaily.installs.plus(ONE_BI);
    coinMachineExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == VOTING_REPUTATION) {
    let votingReputationExtension = getVotingReputationExtension(event);
    votingReputationExtension.installs = votingReputationExtension.installs.plus(ONE_BI);
    votingReputationExtension.save();
    // Daily
    let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
    votingReputationExtensionDaily.installs = votingReputationExtensionDaily.installs.plus(ONE_BI);
    votingReputationExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == WHITELIST) {
    let whitelistExtension = getWhitelistExtension(event);
    whitelistExtension.installs = whitelistExtension.installs.plus(ONE_BI);
    whitelistExtension.save();
    // Daily
    let whitelistExtensionDaily = getWhitelistExtensionDaily(event);
    whitelistExtensionDaily.installs = whitelistExtensionDaily.installs.plus(ONE_BI);
    whitelistExtensionDaily.save();
  }
}
