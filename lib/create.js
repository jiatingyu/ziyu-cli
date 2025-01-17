const axios = require('axios')
const inquirer = require('inquirer')
// const Git = require('nodegit')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const shelljs = require('shelljs')
const fs = require('fs')
const download = require('download-git-repo')

module.exports = async function (proName) {
  const spinner = ora()
  spinner.start('模板获取中，请等候....')
  const { data } = await axios.get('https://api.github.com/users/jiatingyu/repos')
  spinner.stop()
  console.log(chalk.green('模板获取中，请等候....'))
  const repoList = data.filter(item => item.name.includes('Hi'))
  const cloneMap = {}
  repoList.forEach(item => {
    cloneMap[item.name] = item.clone_url
  })
  const packageManageMap = {
    npm: 'npm install',
    yarn: 'yarn ',
    pnpm: 'pnpm install',
  }
  // 设置交互问题
  const promptList = [
    {
      type: 'list',
      name: 'repoName',
      message: '请选择模板仓库',
      choices: repoList,
    },
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      when: !proName,
      validate: function (name = '') {
        const done = this.async()
        name = name.trim()
        if (name.length) {
          done(null, true)
        } else {
          done('项目名称必须输入')
        }
      },
    },
    {
      type: 'confirm',
      name: 'needInstall',
      message: '是否需要安装依赖(N)',
      default: false,
    },
    {
      type: 'list',
      name: 'packageManage',
      message: '是否需要安装依赖(N)',
      choices: ['yarn', 'npm', 'pnpm'],
      default: 'yarn',
      when: function (result) {
        return !!result.needInstall
      },
    },
  ]
  const { repoName, projectName = proName, needInstall, packageManage } = await inquirer.prompt(promptList)
  console.log(chalk.green('开始拉取模板'))
  spinner.start('拉取中...')

  // 从GitHub 上开始拉代码
  let absoultPath = path.join(process.cwd(), projectName)
  download(`jiatingyu/${repoName}`, absoultPath, function (err) {
    try {
      if (!err) {
        spinner.succeed('拉取完成')
        const res = fs.readFileSync(path.join(absoultPath, 'README.md'), 'utf-8')

        if (needInstall) {
          console.log(chalk.yellow('-----开始安装依赖 。。。'))
          console.log(chalk.yellow(`-----安装地址: ${absoultPath} `))
          shelljs.cd('./' + projectName)
          // 通过选择的包管理工具来进行安装
          shelljs.exec(packageManageMap[packageManage], function () {
            console.log(chalk.green(`         -------项目简介 start------- `))
            console.log(chalk.white(res))
            console.log(chalk.green(`         -------项目简介 end  ------- `))
            console.log(chalk.green(`         -------安装完成------- `))
            console.log(chalk.green(`         yarn start`))
          })
        } else {
          console.log(chalk.green(`         -------项目简介 start------- `))
          console.log(chalk.white(res))
          console.log(chalk.green(`         -------项目简介 end  ------- `))
          console.log(chalk.green(`         -------请完成下面操作:-------`))
          console.log(chalk.green(`         cd ${projectName}`))
          console.log(chalk.green(`         npm install `))
        }
      } else {
        console.log(chalk.red(`拉取失败,一般是网络不能连接 gitHub 问题: ' + ${err}`))
      }
    } catch (error) {
      console.log(chalk.red(`内部错误: ' + ${error.message}`))
    }
  })
}
