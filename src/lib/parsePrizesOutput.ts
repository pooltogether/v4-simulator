import { ethers } from 'ethers'
import fs from 'fs'
import { PrizeRow } from '../types'
const csvParser = require('csv-parser')

export async function parsePrizesOutput(filepath: string): Promise<Array<PrizeRow>> {
    return new Promise((resolve, reject) => {

        const results: Array<PrizeRow> = []

        fs.createReadStream(filepath)
            .pipe(csvParser())
            .on('data', (data: any) => {
                results.push({
                    address: data.HolderAddress,
                    tier: parseInt(data.PrizeTier),
                    amount: ethers.BigNumber.from(data.Prize)
                })
            })
            .on('end', () => {
                resolve(results)
            })
            .on('error', (error: any) => {
                reject(error)
            })
    })
}