import {
  CommandLineAction,
  CommandLineFlagParameter,
  CommandLineStringListParameter,
  CommandLineStringParameter
} from '@rushstack/ts-command-line'
import * as tsup from 'tsup'

export class BuildAction extends CommandLineAction {
  #src!: CommandLineStringParameter
  #watch!: CommandLineFlagParameter
  #dts!: CommandLineFlagParameter
  #externals!: CommandLineStringListParameter

  public constructor() {
    super({
      actionName: 'build',
      summary: 'Build libraries',
      documentation: `Reading package.json, build libraries`
    })
  }

  protected override onExecute(): Promise<void> {
    return tsup.build({
      target: 'es2020',
      format: ['esm', 'cjs'],
      entry: [this.#src.value ?? 'src/index.ts'],
      dts: this.#dts.value,
      watch: this.#watch.value,
      minify: !this.#watch.value,
      sourcemap: true,
      external: ['esbuild', ...this.#externals.values]
    })
  }

  protected override onDefineParameters(): void {
    this.#src = this.defineStringParameter({
      argumentName: 'PATH',
      parameterLongName: '--src',
      description: 'Source file'
    })

    this.#dts = this.defineFlagParameter({
      parameterLongName: '--dts',
      description: 'Generate dts files'
    })

    this.#watch = this.defineFlagParameter({
      parameterLongName: '--watch',
      parameterShortName: '-w',
      description: 'Watch files change'
    })

    this.#externals = this.defineStringListParameter({
      argumentName: 'EXTERNALS',
      parameterLongName: '--external',
      description: 'External dependencies'
    })
  }
}
