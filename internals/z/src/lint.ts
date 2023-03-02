import { F, N } from '@mobily/ts-belt'
import { CommandLineAction } from '@rushstack/ts-command-line'
import { ESLint } from 'eslint'
import formatter from 'eslint-formatter-pretty'

export class LintAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'lint',
      summary: 'Build libraries',
      documentation: `Reading package.json, build libraries`
    })
  }

  protected override async onExecute(): Promise<void> {
    const eslint = new ESLint({
      useEslintrc: true,
      fix: true,
      cache: true,
      // doesn't need hash in filename, Rush will handle it
      cacheLocation: '.eslintcache/cache.json',
      cacheStrategy: 'content'
    })
    const results = await eslint.lintFiles('src/**/*')
    const meta = await eslint.getRulesMetaForResults(results)
    const output = formatter(results as any, { rulesMeta: meta })
    const errorCount = results.reduce((count, result) => count + result.errorCount - result.fixableErrorCount, 0)

    F.when(errorCount, N.gt(0), () => {
      // eslint-disable-next-line functional/no-throw-statements
      throw new Error(output)
    })
  }
}
