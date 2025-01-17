#! /usr/bin/env node

const mainFn = require('..') 
const { program } = require('commander')
const { version } = require('../package.json')
/**
 * 命令列表
 */
const actionMap = {
  create: {
    alias: 'crt',
    des: '选择模板项目',
    examples: ['bro crt <projectName>'],
  },
  config: {
    alias: 'cfg',
    des: '初始化配置',
    examples: ['bro cfg set <k> <v>', 'bro cfg get <k>'],
  },
}

// 遍历上述的数据结果来渲染命令信息
Reflect.ownKeys(actionMap).forEach(aName => {
  program
    .command(aName)
    .alias(actionMap[aName].alias)
    .description(actionMap[aName].des)
    .action(() => {
      // 01 我们通过 aName 来获取当前执行的命令
      // 02 通过截取 argv.slice() 相位置参数来获取命令后的参数
      mainFn(aName, process.argv.slice(3))
    })
})

// 通过 on 订阅 --help 事件，将来触发的时候就可以执行相应的回调
program.on('--help', () => {
  Reflect.ownKeys(actionMap).forEach(aName => {
    actionMap[aName].examples.forEach(item => {
      console.log('　' + item)
    })
  })
})

program.version(version).parse(process.argv)
