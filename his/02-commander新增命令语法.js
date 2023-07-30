#! /usr/bin/env node

const { program } = require('commander')

// 如何通过 commander 来新增一个自定义的命令
program
  .command('create')
  .alias('crt')
  .description('创建模板项目')
  .action(() => {
    console.log('crt命令被执行了')
  })

program
  .command('config')
  .alias('cfg')
  .description('初始化项目配置')
  .action(() => {
    console.log('cfg命令被执行了')
  })

program.parse(process.argv)
