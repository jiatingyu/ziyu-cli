const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
// 1 控制文字颜色
console.log(chalk.green('zce'))
console.log(chalk.red('zce'))
console.log(chalk.white('zce'))
console.log(chalk.gray('zce'))

// 2 添加背景色
console.log(chalk.bgBlueBright(chalk.red('带背景色的文字')))

// 3 输出段落性的文字
console.log(chalk`
  {green.bold 车马慢}
  {red 从前...慢，一生只够...}
`)
const res = fs.readFileSync(path.join(__dirname, './test.js'), 'utf-8')
console.log(chalk.red(res))
