import { Option } from '@plimeor/fp'

export const DOTFILES_CONFIG_FILE = 'dotfiles.config.json'

export const DOTFILES_DIR = Option.fromUndefined(process.env['DOTFILES'])
export const HOME_DIR: Option.Option<string> = Option.fromUndefined(process.env['HOME'])
