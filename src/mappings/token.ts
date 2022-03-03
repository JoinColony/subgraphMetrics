import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Token as TokenContract } from '../../generated/templates/Token/Token';
import { Token as TokenSchema } from '../../generated/schema';
import { Token as TokenTemplate } from '../../generated/templates';
import { ZERO_BI, ZERO_BD, ONE_BD } from '../utils';

// On xDai Chain both native and DAI (xDAI) is the same address, as it is the native token
// So we can use it for USD value as well
export const NATIVE_ADDRESS = "0x0000000000000000000000000000000000000000"
export const DAI_ADDRESS = "0x0000000000000000000000000000000000000000"

export function createToken(tokenAddress: string): void {
  let token = TokenSchema.load(tokenAddress)
  if (token == null) {
    token = new TokenSchema(tokenAddress)
    let t = TokenContract.bind(Address.fromString(tokenAddress))

    let decimals = t.try_decimals()
    if (decimals.reverted){
      token.decimals = BigInt.fromI32(18)
    } else {
      token.decimals = BigInt.fromI32(decimals.value)
    }
    let symbol = t.try_symbol()
    if (!symbol.reverted) {
      token.symbol = symbol.value
    } else {
      token.symbol = ""
    }
    let name = t.try_name()
    if (!symbol.reverted) {
      token.name = name.value
    } else {
      token.name = ""
    }
    // Set some default values for 
    if (isNATIVE(<TokenSchema>token)) {
      token.nativeValue = ONE_BD
    } else {
      token.nativeValue = ZERO_BD
    }
    token.nativeTimestamp = ZERO_BI
    token.nativeBlock = ZERO_BI

    if (isUSD(<TokenSchema>token)) {
      token.usd = ONE_BD
    } else {
      token.usd = ZERO_BD
    }
    token.volume = ZERO_BD
    token.nativeVolume = ZERO_BD
    token.usdVolume = ZERO_BD
    token.save()
    TokenTemplate.create(Address.fromString(tokenAddress))
  }
}

export function isNATIVE(token: TokenSchema): boolean {
  return token.id == NATIVE_ADDRESS
}

export function isUSD(token: TokenSchema) : boolean {
  return token.id == DAI_ADDRESS
}

export function fetchTokenBalanceOf(tokenAddress: string, colonyAddress: Address): BigInt {
  let t = TokenContract.bind(Address.fromString(tokenAddress))
  let balance = ZERO_BI
  let balanceResult = t.try_balanceOf(colonyAddress)
  if (!balanceResult.reverted) {
    balance = balanceResult.value
  }

  return balance
}