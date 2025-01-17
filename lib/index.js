module.exports = function (aName, args) {
  // 命令执行的统一入口
  require('./' + aName)(...args)
}
