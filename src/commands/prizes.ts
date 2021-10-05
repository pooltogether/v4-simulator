import { ethers } from 'ethers'
import { parseCsv } from '../lib/parseCsv';
import { computeCardinality } from '../lib/computeCardinality';
import { computeUsers } from '../lib/computeUsers';
import { calculateDrawResults, Draw, DrawResults, PrizeDistribution } from '@pooltogether/draw-calculator-js';
import { dumpDrawResults } from '../lib/dumpDrawResults';
const chalk = require('chalk')

const defaultTiers = [
    ethers.utils.parseUnits('0.5', 9),
    ethers.utils.parseUnits('0.1', 9),
    ethers.utils.parseUnits('0.4', 9)
]

export async function prizes(accountsFilepath: string, outputFilepath: string, options: any) {
    const bitRangeSize: number = options.bitRange
    const distributions: Array<number> = options.tiers || defaultTiers
    const prize: ethers.BigNumber = ethers.BigNumber.from(options.prize)
    const maxPicksPerUser: number = options.maxPicks

    const accounts = (await parseCsv(accountsFilepath, 18))
    console.log(`all done! found ${accounts.length} records`)

    const totalSupply = accounts.reduce((total, account) => {
        return total.add(account.balance)
    }, ethers.BigNumber.from('0'))

    // @ts-ignore
    let users = computeUsers(accounts, totalSupply)

    const matchCardinality = computeCardinality(bitRangeSize, totalSupply)

    const prizeDistribution: PrizeDistribution = {
        matchCardinality,
        numberOfPicks: ethers.BigNumber.from('2').pow(bitRangeSize).pow(matchCardinality),
        distributions,
        bitRangeSize: bitRangeSize,
        prize,
        maxPicksPerUser
    }

    // @ts-ignore
    const draw: Draw = {
        drawId: 1,
        winningRandomNumber: ethers.BigNumber.from(ethers.utils.randomBytes(32))
    }

    const drawResults: Array<DrawResults> = users.map((user, index) => {
        console.log(chalk.yellow(`Computing ${index+1}/${users.length} draw results for ${user.address} with ${ethers.utils.formatEther(accounts[index].balance)} tokens...`))
        return calculateDrawResults(prizeDistribution, draw, user, 0)
    })

    console.log(`computed ${drawResults.length} draw results`)

    dumpDrawResults(outputFilepath, drawResults, users)
}