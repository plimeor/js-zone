import { CommandLineParser } from '@rushstack/ts-command-line'
import { BuildAction } from './build'

export class ZoneCommand extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'z',
      toolDescription: 'Monorepo tools'
    })

    this.addAction(new BuildAction())
  }
}

new ZoneCommand().execute().catch(console.error)
