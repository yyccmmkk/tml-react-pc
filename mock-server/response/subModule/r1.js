module.exports = [
  'api/txt',
  {
    method: 'get',
    path: '/api/sss',
    data: {
      code: 200,
      msg: 'success',
      data: [1, 2, 3, 4],
    },
  },
];
