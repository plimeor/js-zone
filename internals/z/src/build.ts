import {
  CommandLineAction,
  CommandLineFlagParameter,
  CommandLineStringListParameter,
  CommandLineStringParameter
} from '@rushstack/ts-command-line'
import * as tsup from 'tsup'

export class BuildAction extends CommandLineAction {
  private entryFiles!: CommandLineStringParameter
  private watch!: CommandLineFlagParameter
  private declaration!: CommandLineFlagParameter
  private externals!: CommandLineStringListParameter

  public constructor() {
    super({
      actionName: 'build',
      summary: 'Build libraries',
      documentation: `Reading package.json, build libraries`
    })
  }

  protected override onDefineParameters(): void {
    this.entryFiles = this.defineStringParameter({
      argumentName: 'PATH',
      parameterLongName: '--src',
      description: 'Entry files'
    })

    this.declaration = this.defineFlagParameter({
      parameterLongName: '--dts',
      description: 'Whether to generate declaration files'
    })

    this.watch = this.defineFlagParameter({
      parameterLongName: '--watch',
      parameterShortName: '-w',
      description: 'Whether to watch files'
    })

    // eslint-disable-next-line functional/immutable-data
    this.externals = this.defineStringListParameter({
      argumentName: 'EXTERNALS',
      parameterLongName: '--external',
      description: 'Modules to exclude from the bundle'
    })
  }

  protected override onExecute(): Promise<void> {
    return tsup.build({
      target: 'es2020',
      format: ['esm', 'cjs'],
      entry: [this.entryFiles.value ?? 'src/index.ts'],
      dts: this.declaration.value,
      watch: this.watch.value,
      minify: !this.watch.value,
      sourcemap: true,
      external: ['esbuild', ...this.externals.values]
    })
  }
}
