#! /usr/bin/env node
const { program } = require('commander')

// 上面的代码的就相当于是从当前机器配置的系统环境变量当中找到 node.exe 程序
// 所以上面的代码如果想要生效，那么前提是在我们安装完 node之后，配置过系统的环境变量

// 此时我们的结论就是现在 在命令终端中输入 jty 命令，我们就可以执行 bin目录下的 cli.js
// code1 create my_project
// 下面的返回值就是当前命令行行中的参数，默认情况下保存的有node.exe 和 bin下的启动文件
console.log(process.argv)

// 通过上述的属性访问我们可以拿到命令执行时所有的参数，但是如果自己来执行格式化操那，那就太慢了
// node的使用过程不是用自己的包就是用别人的包
// commander

program.parse(process.argv)
