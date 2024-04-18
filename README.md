# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 项目说明

- 支持 class 风格及 hooks 风格
- 支持 css/less/sass/ @emotion/styled 及模块化
- http.service.ts 统一请求处理，支持加解密
- 支持主流浏览器及基于 chrome75 内核及以上浏览器
- 基于 react 18.x / redux-toolkit 2.x /antd 5.x / react-router-dom 6.x / redux-observable 3.x
- 内置工具类库 lodash-es / echarts / rxjs / qs / axios

### 提交规范及版本控制

参考[社区规范](https://www.conventionalcommits.org/en/v1.0.0/)

上线分支打 tag 命令：包含新功能 ` npm run release -- --release-as minor`
指定版本号 ` npm run release -- --release-as vX.x.x`
