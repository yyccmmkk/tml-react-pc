// eslint-disable-next-line no-undef
module.exports = {
  ['/local']: {
    target: 'http://192.168.1.255:8888',
    pathRewrite: { '^/local': '' },
    changeOrigin: true,
    secure: false,
  },
  ['/test']: {
    target: 'http://192.168.0.1:6666',
    pathRewrite: { '^/test': '' },
    changeOrigin: true,
    secure: false,
  },
  ['/pro']: {
    target: 'http://127.0.0.1:6666',
    pathRewrite: { '^/pro': '' },
    changeOrigin: true,
    secure: false,
  },
};
