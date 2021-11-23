const chalk = require('chalk')

function computeProjected(cardinality: number, range: number) {
  let counts = []
  for (let i = 0; i < cardinality; i++) {
    let exactMatches = range**i
    if (i > 0) {
      exactMatches -= range**(i-1);
    }
    console.log(chalk.cyan(`Estimated matching ${cardinality - i}: ${exactMatches}`))
    counts.push(exactMatches)
  }
  return counts
}

function newRandom(cardinality: number, range: number) {
  const random = []
  for (let i = 0; i < cardinality; i++) {
    random.push(Math.floor(Math.random() * range))
  }
  return random
}

function simulate(cardinality: number, range: number, space: number) {
  const winner = newRandom(cardinality, range)
  const counts = new Array(cardinality).fill(0)
  for (let i = 0; i < space; i++) {
    const random = newRandom(cardinality, range)
    let matchCount = 0;
    for (let ri = 0; ri < random.length; ri++) {
      if (random[ri] == winner[ri]) {
        matchCount++;
      } else {
        break;
      }
    }
    if (matchCount > 0) {
      const index = cardinality - matchCount;
      counts[index]++;
    }
  }
  return counts
}

function prizeCounts(options: any) {

    const bitRange = parseInt(options.bitRange)
    const cardinality = parseInt(options.cardinality)
    const iterations = parseInt(options.iterations)

    const range = 2**bitRange
    const odds = range**cardinality
    const space = odds

    console.log(chalk.dim(`Using bit range of ${bitRange}`))
    console.log(chalk.dim(`Using cardinality of ${cardinality}`))
    console.log(chalk.dim(`Using iterations of ${iterations}`))
    console.log(chalk.dim(`Total computed probability space: ${odds}`))
    
    computeProjected(cardinality, range)

    let totalCounts = new Array(cardinality).fill(0)
    for (let i = 0; i < iterations; i++) {
        const counts = simulate(cardinality, range, space)
        totalCounts = totalCounts.map(function (num, idx) {
            const sum = num + counts[idx]
            return sum;
        });
    }

    for (let i = 0; i < totalCounts.length; i++) {
        console.log(chalk.green(`Simulation matched ${cardinality - i}: ${totalCounts[i]}`))
    }

    for (let i = 0; i < totalCounts.length; i++) {
        console.log(chalk.yellow(`Average matched ${cardinality - i}: ${totalCounts[i] / options.iterations}`))
    }
}

export { prizeCounts }