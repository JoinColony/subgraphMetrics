import {
  ExtensionInitialised,
  UserApproved as UserApprovedEvent,
  AgreementSigned as AgreementSignedEvent,
} from '../../generated/templates/Whitelist/Whitelist';

import { ZERO_BI, ONE_BI } from '../utils';
import { WhitelistExtension, WhitelistExtensionDaily } from '../../generated/schema';

export function handleExtensionInitialised(event: ExtensionInitialised): void {
  let whitelistExtension = getWhitelistExtension(event);
  whitelistExtension.initialised = whitelistExtension.initialised.plus(ONE_BI);
  whitelistExtension.save();
  // Daily
  let whitelistExtensionDaily = getWhitelistExtensionDaily(event);
  whitelistExtensionDaily.initialised = whitelistExtensionDaily.initialised.plus(ONE_BI);
  whitelistExtensionDaily.save();
}

export function handleUserApproved(event: UserApprovedEvent): void {
  let whitelistExtension = getWhitelistExtension(event);
  whitelistExtension.userApproved = whitelistExtension.userApproved.plus(ONE_BI);
  whitelistExtension.save();
  // Daily
  let whitelistExtensionDaily = getWhitelistExtensionDaily(event);
  whitelistExtensionDaily.userApproved = whitelistExtensionDaily.userApproved.plus(ONE_BI);
  whitelistExtensionDaily.save();
}

export function handleAgreementSigned(event: AgreementSignedEvent): void {
  let whitelistExtension = getWhitelistExtension(event);
  whitelistExtension.agreementSigned = whitelistExtension.agreementSigned.plus(ONE_BI);
  whitelistExtension.save();
  // Daily
  let whitelistExtensionDaily = getWhitelistExtensionDaily(event);
  whitelistExtensionDaily.agreementSigned = whitelistExtensionDaily.agreementSigned.plus(ONE_BI);
  whitelistExtensionDaily.save();
}

export function getWhitelistExtension(event: any) : WhitelistExtension {
  // Load WhitelistExtension
  let whitelistExtension = WhitelistExtension.load('1');

  // If there is no WhitelistExtension, create it now
  if(WhitelistExtension == null){
    whitelistExtension = new WhitelistExtension('1');

    whitelistExtension.installs = ZERO_BI;
    whitelistExtension.initialised = ZERO_BI;
    whitelistExtension.userApproved = ZERO_BI;
    whitelistExtension.agreementSigned = ZERO_BI;
  }

  whitelistExtension.save();
  return <WhitelistExtension>whitelistExtension;
}


export function getWhitelistExtensionDaily(event: any) : WhitelistExtensionDaily {
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let whitelistExtensionDaily = WhitelistExtensionDaily.load(dayID.toString());
  if (whitelistExtensionDaily === null) {
    whitelistExtensionDaily = new WhitelistExtensionDaily(dayID.toString());
    whitelistExtensionDaily.date = timestamp;
    whitelistExtensionDaily.installs = ZERO_BI;
    whitelistExtensionDaily.initialised = ZERO_BI;
    whitelistExtensionDaily.userApproved = ZERO_BI;
    whitelistExtensionDaily.agreementSigned = ZERO_BI;
  }

  whitelistExtensionDaily.save();
  return <WhitelistExtensionDaily>whitelistExtensionDaily;
}