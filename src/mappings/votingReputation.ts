import {
  ExtensionInitialised,
  MotionCreated,
  MotionStaked,
  MotionEscalated,
  MotionFinalized,
  VotingReputation as VotingReputationContract
} from '../../generated/templates/VotingReputation/VotingReputation';

import { VotingReputationExtension, VotingReputationExtensionDaily } from '../../generated/schema';

import { ZERO_BI, ZERO_BD, ONE_BI } from '../utils';
import { ExtensionDeprecated, ExtensionInstalled, ExtensionUninstalled } from '../../generated/ColonyNetwork/IColonyNetwork';
import { ethereum } from '@graphprotocol/graph-ts';

export function handleExtensionInitialised(event: ExtensionInitialised): void {
  let votingReputationExtension = getVotingReputationExtension(event);
  votingReputationExtension.initialised = votingReputationExtension.initialised.plus(ONE_BI);
  votingReputationExtension.save();
  // Daily
  let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
  votingReputationExtensionDaily.initialised = votingReputationExtensionDaily.initialised.plus(ONE_BI);
  votingReputationExtensionDaily.save();
}

export function handleMotionCreated(event: MotionCreated): void {
  let votingReputationExtension = getVotingReputationExtension(event);
  votingReputationExtension.motions = votingReputationExtension.motions.plus(ONE_BI);
  votingReputationExtension.save();
  // Daily
  let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
  votingReputationExtensionDaily.motions = votingReputationExtensionDaily.motions.plus(ONE_BI);
  votingReputationExtensionDaily.save();
}

export function handleMotionStaked(event: MotionStaked): void {
  let extension = VotingReputationContract.bind(event.address);
  let motionId = event.params.motionId;
  let chainMotion = extension.getMotion(motionId);

  let votingReputationExtension = getVotingReputationExtension(event);
  votingReputationExtension.motionsStaked = votingReputationExtension.motionsStaked.plus(ONE_BI);
  votingReputationExtension.save();
  // Daily
  let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
  votingReputationExtensionDaily.motionsStaked = votingReputationExtensionDaily.motionsStaked.plus(ONE_BI);
  votingReputationExtensionDaily.save();

  // TODO Handle how much is staked for each token
}

export function handleMotionEscalated(event: MotionEscalated): void {
  let votingReputationExtension = getVotingReputationExtension(event);
  votingReputationExtension.motionsEscalated = votingReputationExtension.motionsEscalated.plus(ONE_BI);
  votingReputationExtension.save();
  // Daily
  let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
  votingReputationExtensionDaily.motionsEscalated = votingReputationExtensionDaily.motionsEscalated.plus(ONE_BI);
  votingReputationExtensionDaily.save();
}

export function handleMotionFinalized(event: MotionFinalized): void {
  let votingReputationExtension = getVotingReputationExtension(event);
  votingReputationExtension.motionsFinalized = votingReputationExtension.motionsFinalized.plus(ONE_BI);
  votingReputationExtension.save();
  // Daily
  let votingReputationExtensionDaily = getVotingReputationExtensionDaily(event);
  votingReputationExtensionDaily.motionsFinalized = votingReputationExtensionDaily.motionsFinalized.plus(ONE_BI);
  votingReputationExtensionDaily.save();
}

export function getVotingReputationExtension(event: ethereum.Event) : VotingReputationExtension {
  // Load VotingReputationExtension
  let votingReputationExtension = VotingReputationExtension.load('1');

  // If there is no VotingReputationExtension, create it now
  if(votingReputationExtension == null){
    votingReputationExtension = new VotingReputationExtension('1');

    votingReputationExtension.installs = ZERO_BI;
    votingReputationExtension.initialised = ZERO_BI;
    votingReputationExtension.depreciated = ZERO_BI;
    votingReputationExtension.uninstalled = ZERO_BI;
    votingReputationExtension.motions = ZERO_BI;
    votingReputationExtension.motionsStaked = ZERO_BI;
    votingReputationExtension.motionsEscalated = ZERO_BI;
    votingReputationExtension.motionsFinalized = ZERO_BI;
    votingReputationExtension.stakedNative = ZERO_BD;
    votingReputationExtension.stakedUSD = ZERO_BD;
  }

  votingReputationExtension.save();
  return <VotingReputationExtension>votingReputationExtension;
}

export function getVotingReputationExtensionDaily(event: ethereum.Event) : VotingReputationExtensionDaily {
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let votingReputationExtensionDaily = VotingReputationExtensionDaily.load(dayID.toString());
  if (votingReputationExtensionDaily === null) {
    votingReputationExtensionDaily = new VotingReputationExtensionDaily(dayID.toString());
    votingReputationExtensionDaily.date = timestamp;
    votingReputationExtensionDaily.installs = ZERO_BI;
    votingReputationExtensionDaily.initialised = ZERO_BI;
    votingReputationExtensionDaily.depreciated = ZERO_BI;
    votingReputationExtensionDaily.uninstalled = ZERO_BI;
    votingReputationExtensionDaily.motions = ZERO_BI;
    votingReputationExtensionDaily.motionsStaked = ZERO_BI;
    votingReputationExtensionDaily.motionsEscalated = ZERO_BI;
    votingReputationExtensionDaily.motionsFinalized = ZERO_BI;
    votingReputationExtensionDaily.stakedNative = ZERO_BD;
    votingReputationExtensionDaily.stakedUSD = ZERO_BD;
  }
  
  votingReputationExtensionDaily.save();
  return <VotingReputationExtensionDaily>votingReputationExtensionDaily;
}