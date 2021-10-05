import { ethers } from "ethers";
import { parsePrizesOutput } from "../lib/parsePrizesOutput";
import { PrizeRow } from "../types";

const chalk = require('chalk')

export async function metrics(prizesOutputFilename: string) {
    const prizes: Array<PrizeRow> = await parsePrizesOutput(prizesOutputFilename)

    const totalPrizes = prizes.reduce((total, prizeRow) => {
        console.log(`Prize row is: ${ethers.utils.formatEther(prizeRow.amount)}`)
        return total.add(prizeRow.amount)
    }, ethers.BigNumber.from('0'))

    console.log(chalk.green(`Total prizes given away: ${ethers.utils.formatEther(totalPrizes)}`))
}