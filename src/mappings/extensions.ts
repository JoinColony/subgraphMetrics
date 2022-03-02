import { crypto, ByteArray } from '@graphprotocol/graph-ts';

import {
  ExtensionDeprecated,
  ExtensionInstalled,
  ExtensionUninstalled,
} from '../../generated/ColonyNetwork/IColonyNetwork';

import { ONE_BI } from '../utils';

import { getCoinMachineExtension, getCoinMachineExtensionDaily } from './coinMachine';
import { getOneTxPaymentExtension, getOneTxPaymentExtensionDaily } from './oneTxPayment';
import { getVotingReputationExtension, getVotingReputationExtensionDaily } from './votingReputation';
import { getWhitelistExtension, getWhitelistExtensionDaily } from './whitelist';

export function getHandleExtensionInstalled(event: ExtensionInstalled): void {
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

export function getHandleExtensionUninstalled(event: ExtensionUninstalled): void {
  let ONE_TX_PAYMENT = crypto.keccak256(ByteArray.fromUTF8("OneTxPayment")).toHexString()
  let COIN_MACHINE = crypto.keccak256(ByteArray.fromUTF8("CoinMachine")).toHexString()
  let VOTING_REPUTATION = crypto.keccak256(ByteArray.fromUTF8("VotingReputation")).toHexString()
  let WHITELIST = crypto.keccak256(ByteArray.fromUTF8("Whitelist")).toHexString()

  if (event.params.extensionId.toHexString() == ONE_TX_PAYMENT) {
    let oneTxPaymentExtension = getOneTxPaymentExtension(event);
    oneTxPaymentExtension.uninstalled = oneTxPaymentExtension.uninstalled.plus(ONE_BI);
    oneTxPaymentExtension.save();
    // Daily
    let oneTxPaymentExtensionDaily = getOneTxPaymentExtensionDaily(event);
    oneTxPaymentExtensionDaily.uninstalled = oneTxPaymentExtensionDaily.uninstalled.plus(ONE_BI);
    oneTxPaymentExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == COIN_MACHINE) {
    let coinMachineExtension = getCoinMachineExtension(event);
    coinMachineExtension.uninstalled = coinMachineExtension.uninstalled.plus(ONE_BI);
    coinMachineExtension.save();
    // Daily
    let coinMachineExtensionDaily = getCoinMachineExtensionDaily(event);
    coinMachineExtensionDaily.uninstalled = coinMachineExtensionDaily.uninstalled.plus(ONE_BI);
    coinMachineExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == VOTING_REPUTATION) {
    let votingReputationExtension = getVotingReputationExtension(event);
    votingReputationExtension.uninstalled = votingReputationExtension.uninstalled.plus(ONE_BI);
    votingReputationExtension.save();
    // Daily
    let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
    votingReputationExtensionDaily.uninstalled = votingReputationExtensionDaily.uninstalled.plus(ONE_BI);
    votingReputationExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == WHITELIST) {
    let whitelistExtension = getWhitelistExtension(event);
    whitelistExtension.uninstalled = whitelistExtension.uninstalled.plus(ONE_BI);
    whitelistExtension.save();
    // Daily
    let whitelistExtensionDaily = getWhitelistExtensionDaily(event);
    whitelistExtensionDaily.uninstalled = whitelistExtensionDaily.uninstalled.plus(ONE_BI);
    whitelistExtensionDaily.save();
  }
}

export function getHandleExtensionDeprecated(event: ExtensionDeprecated): void {
  let ONE_TX_PAYMENT = crypto.keccak256(ByteArray.fromUTF8("OneTxPayment")).toHexString()
  let COIN_MACHINE = crypto.keccak256(ByteArray.fromUTF8("CoinMachine")).toHexString()
  let VOTING_REPUTATION = crypto.keccak256(ByteArray.fromUTF8("VotingReputation")).toHexString()
  let WHITELIST = crypto.keccak256(ByteArray.fromUTF8("Whitelist")).toHexString()

  if (event.params.extensionId.toHexString() == ONE_TX_PAYMENT) {
    let oneTxPaymentExtension = getOneTxPaymentExtension(event);
    oneTxPaymentExtension.depreciated = oneTxPaymentExtension.depreciated.plus(ONE_BI);
    oneTxPaymentExtension.save();
    // Daily
    let oneTxPaymentExtensionDaily = getOneTxPaymentExtensionDaily(event);
    oneTxPaymentExtensionDaily.depreciated = oneTxPaymentExtensionDaily.depreciated.plus(ONE_BI);
    oneTxPaymentExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == COIN_MACHINE) {
    let coinMachineExtension = getCoinMachineExtension(event);
    coinMachineExtension.depreciated = coinMachineExtension.depreciated.plus(ONE_BI);
    coinMachineExtension.save();
    // Daily
    let coinMachineExtensionDaily = getCoinMachineExtensionDaily(event);
    coinMachineExtensionDaily.depreciated = coinMachineExtensionDaily.depreciated.plus(ONE_BI);
    coinMachineExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == VOTING_REPUTATION) {
    let votingReputationExtension = getVotingReputationExtension(event);
    votingReputationExtension.depreciated = votingReputationExtension.depreciated.plus(ONE_BI);
    votingReputationExtension.save();
    // Daily
    let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
    votingReputationExtensionDaily.depreciated = votingReputationExtensionDaily.depreciated.plus(ONE_BI);
    votingReputationExtensionDaily.save();
  }

  if (event.params.extensionId.toHexString() == WHITELIST) {
    let whitelistExtension = getWhitelistExtension(event);
    whitelistExtension.depreciated = whitelistExtension.depreciated.plus(ONE_BI);
    whitelistExtension.save();
    // Daily
    let whitelistExtensionDaily = getWhitelistExtensionDaily(event);
    whitelistExtensionDaily.depreciated = whitelistExtensionDaily.depreciated.plus(ONE_BI);
    whitelistExtensionDaily.save();
  }
}