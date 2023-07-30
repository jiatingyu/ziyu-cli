const ora = require('ora')

const spinner = ora('正在下载')
spinner.start()
setTimeout(() => {
  // console.log("模拟耗时操作");
  // spinner.succeed("下载成功");
  spinner.fail('下载失败了')
  // info warn stop
}, 2000)

/*
  核心结构：
    start()
    中间是耗时的操作
    对应的结尾
*/
