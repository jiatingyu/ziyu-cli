#! /usr/bin/env node

const mainFn = require(".."); // 这句话的作用就是找到了当前项目下 lib 里的 index.js
const { program } = require("commander");
const { version } = require("../package.json");
/**
 * cli.js 文件在我们的脚手架实现过程，
 * 业务逻辑代码都会先传组 index.js （入口文件）
 */
// 将多个自定义命令放置在一个数据结构中
const actionMap = {
  create: {
    alias: "crt",
    des: "创建模板项目",
    examples: ["jty crt <projectName>"],
  },
  config: {
    alias: "cfg",
    des: "初始化配置",
    examples: ["jty cfg set <k> <v>", "jty cfg get <k>"],
  },
};

// 遍历上述的数据结果来渲染命令信息
Reflect.ownKeys(actionMap).forEach((aName) => {
  program
    .command(aName)
    .alias(actionMap[aName].alias)
    .description(actionMap[aName].des)
    .action(() => {
      // 01 我们通过 aName 来获取当前执行的命令
      // 02 通过截取 argv.slice() 相位置参数来获取命令后的参数
      mainFn(aName, process.argv.slice(3));
    });
});

// 通过 on 订阅 --help 事件，将来触发的时候就可以执行相应的回调
program.on("--help", () => {
  Reflect.ownKeys(actionMap).forEach((aName) => {
    actionMap[aName].examples.forEach((item) => {
      console.log("　" + item);
    });
  });
});

program.version(version).parse(process.argv);
