import {
  OneTxPaymentMade,
  ExtensionInitialised,
} from '../../generated/templates/OneTxPayment/OneTxPayment';

import { OneTxPaymentExtension, OneTxPaymentExtensionDaily } from '../../generated/schema';

import { ZERO_BI, ONE_BI } from '../utils';
import { ExtensionDeprecated, ExtensionInstalled, ExtensionUninstalled } from '../../generated/ColonyNetwork/IColonyNetwork';
import { ethereum } from '@graphprotocol/graph-ts';

export function handleExtensionInitialised(event: ExtensionInitialised): void {
  let oneTxPaymentExtension = getOneTxPaymentExtension(event);
  oneTxPaymentExtension.initialised = oneTxPaymentExtension.initialised.plus(ONE_BI);
  oneTxPaymentExtension.save();
  // Daily
  let oneTxPaymentExtensionDaily = getOneTxPaymentExtensionDaily(event);
  oneTxPaymentExtensionDaily.initialised = oneTxPaymentExtensionDaily.initialised.plus(ONE_BI);
  oneTxPaymentExtensionDaily.save();
}

export function handleOneTxPaymentMade(event: OneTxPaymentMade): void {
  let oneTxPaymentExtension = getOneTxPaymentExtension(event);
  oneTxPaymentExtension.totalPayments = oneTxPaymentExtension.totalPayments.plus(ONE_BI);
  oneTxPaymentExtension.save();
  // Daily
  let oneTxPaymentExtensionDaily = getOneTxPaymentExtensionDaily(event);
  oneTxPaymentExtensionDaily.totalPayments = oneTxPaymentExtensionDaily.totalPayments.plus(ONE_BI);
  oneTxPaymentExtensionDaily.save();

  // TODO Handle how much of a token is paid
}

export function getOneTxPaymentExtension(event: ethereum.Event) : OneTxPaymentExtension {
  // Load OneTxPaymentExtension
  let oneTxPaymentExtension = OneTxPaymentExtension.load('1');

  // If there is no OneTxPaymentExtension, create it now
  if(oneTxPaymentExtension == null){
    oneTxPaymentExtension = new OneTxPaymentExtension('1');

    oneTxPaymentExtension.installs = ZERO_BI;
    oneTxPaymentExtension.initialised = ZERO_BI;
    oneTxPaymentExtension.depreciated = ZERO_BI;
    oneTxPaymentExtension.uninstalled = ZERO_BI;
    oneTxPaymentExtension.totalPayments = ZERO_BI;
    oneTxPaymentExtension.tokens = [];
  }

  oneTxPaymentExtension.save();
  return <OneTxPaymentExtension>oneTxPaymentExtension;
}

export function getOneTxPaymentExtensionDaily(event: ethereum.Event) : OneTxPaymentExtensionDaily {
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  // Load OneTxPaymentExtension
  let oneTxPaymentExtensionDaily = OneTxPaymentExtensionDaily.load(dayID.toString());
  // If there is no OneTxPaymentExtension, create it now
  if(oneTxPaymentExtensionDaily == null){
    oneTxPaymentExtensionDaily = new OneTxPaymentExtensionDaily(dayID.toString());
    oneTxPaymentExtensionDaily.date = timestamp;
    oneTxPaymentExtensionDaily.installs = ZERO_BI;
    oneTxPaymentExtensionDaily.initialised = ZERO_BI;
    oneTxPaymentExtensionDaily.depreciated = ZERO_BI;
    oneTxPaymentExtensionDaily.uninstalled = ZERO_BI;
    oneTxPaymentExtensionDaily.totalPayments = ZERO_BI;
    oneTxPaymentExtensionDaily.tokens = [];
  }

  oneTxPaymentExtensionDaily.save();
  return <OneTxPaymentExtensionDaily>oneTxPaymentExtensionDaily;
}
