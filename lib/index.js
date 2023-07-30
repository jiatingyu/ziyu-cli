module.exports = function (aName, args) {
  // 01 将来在使用的时候，会将当前的次命令传递给 index.js 
  // 02 我们是否应该将不同的命令对应的业务逻辑代码都写在 index.js 当中
  require('./' + aName)(...args)
}