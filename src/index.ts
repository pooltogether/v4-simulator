#!/usr/bin/env node
import { ethers } from 'ethers'
import { Command } from 'commander';
import { prizes } from './commands/prizes';
import { metrics } from './commands/metrics';
import { prizeCounts } from './commands/prize-counts';

const program = new Command()

program
  .command('prizes [accountsFilename] [outputFilename]')
  .description('computes the prizes for a given csv of accounts')
  .option('-br, --bit-range [number]', 'number of bits', '3')
  .option('-mp, --max-picks [number]', 'max picks per user', '10')
  .option('-p, --prize [number]', 'size of the prize', ethers.utils.parseEther('50000').toString())
  .option('-i, --iterations [number]', 'number of simulations to run', '1')
  .option('-t, --tiers <items>', 'prize tiers as comma-separated percentages')
  .action(prizes)

program
  .command('metrics [prizesOutput]')
  .action(metrics)

program
  .command('counts')
  .option('-br, --bit-range [number]', 'number of bits', '3')
  .option('-c, --cardinality [number]', 'cardinality', '5')
  .option('-i, --iterations [number]', 'number of simulations to run', '1')
  .action(prizeCounts)
  
program.showHelpAfterError()
program.parse(process.argv)
