import { DrawResults, PrizeAwardable, User } from '@pooltogether/draw-calculator-js'
import fs from 'fs'

export function dumpDrawResults(outputFilepath: string, drawResults: Array<DrawResults>, users: Array<User>) {
    let output = `"HolderAddress","PrizeTier","Prize"\n`

    drawResults.forEach((drawResult, index) => {
        drawResult.prizes.forEach((prize: PrizeAwardable) => {
            output += `${users[index].address},${prize.distributionIndex},${prize.amount}\n`
        })
    })

    fs.writeFileSync(outputFilepath, output)
}