import { CommandLineAction } from '@rushstack/ts-command-line'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { DOTFILES_CONFIG_FILE } from './common'

export class InitAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'init',
      summary: 'Initialize dotfiles config',
      documentation: `Create a dotfiles.json file`
    })
  }

  protected override onExecute(): Promise<void> {
    const filePath = path.resolve(process.cwd(), DOTFILES_CONFIG_FILE)
    if (fs.existsSync(filePath) === false) {
      fs.writeFileSync(filePath, JSON.stringify({}))
    }
    return Promise.resolve()
  }
}
