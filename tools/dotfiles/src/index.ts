import { CommandLineParser } from '@rushstack/ts-command-line'
import { InitAction } from './init'

export class DotfilesCommand extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'dotfiles',
      toolDescription: 'A simple dotfiles manager'
    })

    this.addAction(new InitAction())
  }
}

new DotfilesCommand().execute().catch(console.error)

console.log('a')
