import { BigNumber } from "@ethersproject/bignumber";

export type Account = {
    address: string,
    balance: BigNumber
}

export type PrizeRow = {
    address: string,
    tier: number,
    amount: BigNumber
}