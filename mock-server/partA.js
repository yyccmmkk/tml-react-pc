const list = require('./store');

list.push(
  ...[
    {
      method: 'get',
      path: '/async/list',
      data: {
        code: 200,
        msg: 'success',
        data: ['张三', '李四', '王五', '刘六', '丁七', '木八', '盛九', '潘十'],
      },
    },
  ]
);
