const inquirer = require('inquirer')
const chalk = require('chalk')

// 这个包的作用就是在命令行终端提供问题交互模式
const prompList = [
  {
    type: "confirm",
    name: 'isLoad', 
    message: '是否安装依赖'
  },
  {
    type: 'list', 
    name: 'method', 
    message: '选择安装的方式', 
    choices: ['npm', 'cnpm', 'yarn', 'nvm'],
    when(answer) {
      if (answer.isLoad) {
        return true 
      } else {
        return false
      }
    }
  }
]

inquirer.prompt(prompList).then((answer) => {
  console.log(answer)
})
