import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from 'ethers'
import { User } from "@pooltogether/draw-calculator-js";
import { Account } from "../types";

export function computeUsers(accounts: Array<Account>, totalSupply: BigNumber): Array<User> {
    return accounts.map(account => ({
        address: account.address,
        normalizedBalances: [account.balance.mul(ethers.constants.WeiPerEther).div(totalSupply)]
    }))
}