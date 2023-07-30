const inquirer = require('inquirer')
const chalk = require('chalk')

// 这个包的作用就是在命令行终端提供问题交互模式
const prompList = [
  {
    type: 'input',
    name: 'user',
    default: 'zcegg',
    message: chalk.red('请输入用户名')
  }
]

inquirer.prompt(prompList).then((answer) => {
  console.log(answer)
})

/* 
  基本语法使用 
    01 实例 inquirer 对象
    02 新建问题，内置常见字段： type name message 
    03 调用 prompt 方法来使用问题 
*/