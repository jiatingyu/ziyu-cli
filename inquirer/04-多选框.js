const inquirer = require('inquirer')

// 这个包的作用就是在命令行终端提供问题交互模式
const prompList = [
  {
    type: 'checkbox',
    name: 'hobby',
    message: '选择一个爱好',
    pageSize: 2, // 一页放2个
    choices: ['篮球', 'NBA', 'CBA', 'WCBA', 'WNBA'],
  },
]

inquirer.prompt(prompList).then(answer => {
  console.log(answer)
})

/*
  01 初始化函数进行调用即可
  02 常见的问题类型
    input
    list
    confirm
    checkbox
    password
  03 方法
    validate : 对当前问题数据进行较验
    when: 当前问题如果依赖于上一个问题，那么就可以判断是否显示当前问题

*/
