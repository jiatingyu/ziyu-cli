#! /usr/bin/env node

const {version} = require('../package.json')
const {program} = require('commander')

// 将多个自定义命令放置在一个数据结构中
const actionMap = {
  create: {
    alias: 'crt', 
    des: '创建模板项目', 
    examples: ['jty crt <projectName>']
  },
  config: {
    alias: 'cfg', 
    des: '初始化配置', 
    examples: [
      'jty cfg set <k> <v>',
      'jty cfg get <k>'
    ]
  }
}

// 遍历上述的数据结果来渲染命令信息
Reflect.ownKeys(actionMap).forEach((aName) => {
  program
    .command(aName)
    .alias(actionMap[aName].alias)
    .description(actionMap[aName].des)
})

// 通过 on 订阅 --help 事件，将来触发的时候就可以执行相应的回调
program.on('--help', () => {
  console.log('Examples: ')
  Reflect.ownKeys(actionMap).forEach((aName) => {
    actionMap[aName].examples.forEach((item) => {
      console.log("　" + item)
    })
  })
})

program.version(version).parse(process.argv)
