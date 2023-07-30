const axios = require('axios')
const inquirer = require('inquirer')
// const Git = require('nodegit')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const shelljs = require('shelljs')
const fs = require('fs')
const download = require('download-git-repo')

// 当前create.js 这个模块核心要解决的问题就是在用户调用 create 命令的时候可以完成依据模板来创建项目这个操作
module.exports = async function (proName) {
  // 先去获取远端仓库中所存在的模板名称列表
  // 此时就可以使用 axios 来发送请求，这个时候的地址是 github 官方提供的 API
  // github 官方API在使用的有一个限制，这个限制就是每小时只能访问 60次
  // 将 github API访问次数的限制修改为 5000次？
  // oAuthor 、 access token
  console.log(chalk.green('数据获取中....'))
  const { data } = await axios.get('https://api.github.com/users/jiatingyu/repos')

  // 将上述的数据处理一下，返回一个数组，这样便于我们下面做交互选择
  const repoList = data.map(item => item.name)
  const cloneMap = {}
  data.forEach(item => {
    cloneMap[item.name] = item.clone_url
  })
  // 有了这个数组之后就可以设置交互问题了
  const promptList = [
    {
      type: 'list',
      name: 'repoName',
      message: '请选择模板仓库',
      choices: repoList,
    },
  ]
  const { repoName } = await inquirer.prompt(promptList)
  console.log(repoName)
  console.log(cloneMap[repoName])
  // 根据

  const spinner = ora()
  console.log(chalk.green('正在下载....'))
  // Git.Clone(cloneMap[repoName],path.join(process.cwd(),proName)).then(res=>{
  // }).catch(err=>{
  //   spinner.fail('下载失败，请重新下载'+err)
  // })
  // 这里默认 用github 下载，但是下载的github 地址可能需要在程序里去修改一下
  download(`jiatingyu/${repoName}`, path.join(process.cwd(), proName), function (err) {
    if (!err) {
      spinner.succeed('下载完成')
      spinner.succeed('open' + path.resolve('.'))
      console.log(chalk.white('开始安装依赖 。。。'))
      shelljs.cd('./' + proName)
      shelljs.exec('npm i ', function () {
        const res = fs.readFileSync(path.join(process.cwd(), proName, 'README.md'), 'utf-8')
        console.log(chalk.green(res))
      })
    } else {
      spinner.fail('下载失败，请重新下载' + err)
    }
  })
}
