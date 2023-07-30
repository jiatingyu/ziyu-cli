module.exports = plop => {
  plop.setGenerator('component', {
    //
    description: '这是用plop生成一个component项目结构',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '组件名称',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'router/component/{{name}}/{{name}}.js',
        templateFile: 'plop/component/c.js.hbs',
      },
      {
        type: 'add',
        path: 'router/component/{{name}}/{{name}}.html',
        templateFile: 'plop/component/c.html.hbs',
      },
    ],
  })
  plop.setGenerator('module', {
    //
    description: '这是用plop生成一个 module 项目结构',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '模块名称',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'router/component/{{name}}/{{name}}.js',
        templateFile: 'plop/component/c.js.hbs',
      },
      {
        type: 'add',
        path: 'router/component/{{name}}/{{name}}.html',
        templateFile: 'plop/component/c.html.hbs',
      },
    ],
  })
}
