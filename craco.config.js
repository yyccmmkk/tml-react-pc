// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
  babel: {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },
  // ...
  webpack: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src/'),
      // eslint-disable-next-line no-undef
      '@c': path.resolve(__dirname, 'src/components/'),
      // eslint-disable-next-line no-undef
      '@s': path.resolve(__dirname, 'src/redux/slices/'),
      // eslint-disable-next-line no-undef
      '@x': path.resolve(__dirname, 'src/redux/'),
      // eslint-disable-next-line no-undef
      '@u': path.resolve(__dirname, 'src/utils/'),
      // eslint-disable-next-line no-undef
      '@r': path.resolve(__dirname, 'src/router/'),
    },
    configure: (webpackConfig, { env, paths }) => {
      /* ... */
      return webpackConfig;
    },
  },
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
      },
    });
    return devServerConfig;
  },
};
