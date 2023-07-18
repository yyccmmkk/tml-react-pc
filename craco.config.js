// eslint-disable-next-line no-undef
module.exports = {
  // ...
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    /* ... */
    Object.assign(devServerConfig, {
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: false,
        },
      },
      proxy: {
        ['/local']: {
          target: 'http://192.168.44.22:8888',
          pathRewrite: { '^/local': '' },
          changeOrigin: true,
          secure: false,
        },
      },
    });
    return devServerConfig;
  },
};
