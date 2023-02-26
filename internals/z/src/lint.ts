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
      fix: true
    })
    const results = await eslint.lintFiles('src/**/*')
    const meta = await eslint.getRulesMetaForResults(results)
    const output = formatter(results as any, { rulesMeta: meta })
    let errorCount = 0
    for (const result of results) {
      errorCount += result.errorCount - result.fixableErrorCount
    }
    if (errorCount > 0) {
      throw new Error(output)
    }
  }
}
