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
    });
    return devServerConfig;
  },
};
