import { CommandLineParser } from '@rushstack/ts-command-line'
import { BuildAction } from './build'
import { LintAction } from './lint'

export class ZoneCommand extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'z',
      toolDescription: 'Monorepo tools'
    })

    this.addAction(new BuildAction())
    this.addAction(new LintAction())
  }
}

new ZoneCommand().execute().catch(console.error)
