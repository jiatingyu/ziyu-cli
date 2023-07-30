const inquirer = require('inquirer')
// const chalk = require('chalk')

// 这个包的作用就是在命令行终端提供问题交互模式
const prompList = [
  {
    type: 'input',
    name: 'user',
    message: '请输入用户名',
    validate(val) {
      if (!val) {
        return '请输入一个必填的用户名'
      }
      return true
    },
  },
]

inquirer.prompt(prompList).then(answer => {
  console.log(answer)
})
