import {
  DomainAdded,
  DomainAdded1 as HistoricDomainAdded,
  TokenUnlocked,
  TokensMinted,
  ColonyFundsClaimed,
  RewardPayoutCycleStarted,
  RewardPayoutCycleEnded,
  RewardPayoutClaimed,
  ColonyRewardInverseSet,
  ExpenditureAdded,
  ExpenditureTransferred,
  ExpenditureCancelled,
  ExpenditureFinalized,
  PayoutClaimed,
  TokensBurned,
  TaskAdded,
  TaskCompleted,
  TaskFinalized,
  PaymentFinalized,
  ColonyUpgraded,
  ColonyFundsMovedBetweenFundingPots__Params,
} from '../../generated/templates/Colony/IColony';
import { ONE_BI } from '../utils';
import { getColonyMetrics, getColonyMetricsDaily } from './colonyNetwork';
import { RecoveryModeEntered, RecoveryModeExitApproved } from '../../generated/ColonyNetwork/IColonyNetwork';

export function handleColonyFundsClaimed(event: ColonyFundsClaimed): void {
  // TODO: Handle funds claimed by a colony
}

export function handleRewardPayoutCycleStarted(event: RewardPayoutCycleStarted): void {
  // TODO: Determine if it needs to be tracked
}

export function handleRewardPayoutCycleEnded(event: RewardPayoutCycleEnded): void {
  // TODO: Determine if it needs to be tracked
}

export function handleRewardPayoutClaimed(event: RewardPayoutClaimed): void {
  // TODO: Determine if it needs to be tracked
}

export function handleColonyRewardInverseSet(event: ColonyRewardInverseSet): void {
  // TODO: Determine if it needs to be tracked
}

export function handleExpenditureAdded(event: ExpenditureAdded): void {
  // TODO: Determine if it needs to be tracked
}

export function handleExpenditureTransferred(event: ExpenditureTransferred): void {
  // TODO: Handle expenditure transferred
}

export function handleExpenditureCancelled(event: ExpenditureCancelled): void {
  // TODO: Determine if it needs to be tracked
}

export function handleExpenditureFinalized(event: ExpenditureFinalized): void {
  // TODO: Determine if it needs to be tracked
}

export function handleTaskAdded(event: TaskAdded): void {
  // TODO: Determine if it needs to be tracked
}

export function handleTaskCompleted(event: TaskCompleted): void {
  // TODO: Determine if it needs to be tracked
}

export function handleTaskFinalized(event: TaskFinalized): void {
  // TODO: Determine if it needs to be tracked
}

export function handleTokenUnlocked(event: TokenUnlocked): void {
  // TODO: Handle token unlocked
}

export function handleTokensMinted(event: TokensMinted): void {
  // TODO: Handle tokens minted
}

export function handlePayoutClaimed(event: PayoutClaimed): void {
  // TODO: Determine if it needs to be tracked
}

export function handleDomainAdded(event: DomainAdded): void {
  let colonyMetrics = getColonyMetrics(event);
  colonyMetrics.domains = colonyMetrics.domains.plus(ONE_BI);
  colonyMetrics.save();
  // Daily
  let colonyMetricsDaily = getColonyMetricsDaily(event);
  colonyMetricsDaily.domains = colonyMetricsDaily.domains.plus(ONE_BI);
  colonyMetricsDaily.save();
}

export function handleHistoricDomainAdded(event: HistoricDomainAdded): void {
  let colonyMetrics = getColonyMetrics(event);
  colonyMetrics.domains = colonyMetrics.domains.plus(ONE_BI);
  colonyMetrics.save();
  // Daily
  let colonyMetricsDaily = getColonyMetricsDaily(event);
  colonyMetricsDaily.domains = colonyMetricsDaily.domains.plus(ONE_BI);
  colonyMetricsDaily.save();
}

export function handlePaymentFinalized(event: PaymentFinalized): void {
  // TODO: Determine if it needs to be tracked
}

export function handleTokensBurned(event: TokensBurned): void {
  // TODO: Handle tokens burned
}

export function handleRecoveryModeEntered(event: RecoveryModeEntered): void {
  // TODO: Handle recovery mode entered
}

export function handleRecoveryModeExitApproved(event: RecoveryModeExitApproved): void {
  // TODO: Handle recovery mode exit approved
}

export function handleFundsMovedBetweenFundingPots(event: ColonyFundsMovedBetweenFundingPots__Params): void {
  // TODO: Handle funds moved between funding pots
}

export function handleColonyUpgraded(event: ColonyUpgraded): void {
  // TODO: Handle Colony upgraded
}