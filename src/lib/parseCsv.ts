import { ethers } from 'ethers'
import fs from 'fs'
import { Account } from '../types'
const csvParser = require('csv-parser')

export async function parseCsv(filepath: string, decimals: number = 18): Promise<Array<Account>> {
    return new Promise((resolve, reject) => {

        const results: Array<Account> = []

        fs.createReadStream(filepath)
            .pipe(csvParser())
            .on('data', (data: any) => {
                results.push({
                    address: data.HolderAddress,
                    balance: ethers.utils.parseUnits(data.Balance, decimals)
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