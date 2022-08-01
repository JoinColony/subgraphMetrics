import {
  OneTxPaymentMade,
  ExtensionInitialised,
} from '../../generated/templates/OneTxPayment/OneTxPayment';

import { OneTxPaymentExtension, OneTxPaymentExtensionDaily } from '../../generated/schema';

import { ZERO_BI, ONE_BI } from '../utils';
import { ethereum } from '@graphprotocol/graph-ts';

export function processAllTransactions(event: ExtensionInitialised): void {
  // Process all transactions performed in Colony Network
}