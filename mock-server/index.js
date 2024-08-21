const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('node:path');
const app = new Koa();
const router = new Router();
const fs = require('node:fs');
const filePath = path.resolve('./response');
const ignorePathRegExp = /node_modules/;
const needCheckFileRegExp = /\.js$/;

const list = require('./store');

function main(filePath) {
  const files = fs.readdirSync(filePath);
  for (let file of files) {
    if (ignorePathRegExp.test(file)) {
      continue;
    }
    const _path = path.join(filePath, file);
    const stat = fs.statSync(_path);
    if (stat.isFile()) {
      if (!needCheckFileRegExp.test(_path)) {
        continue;
      }
      const k = require(_path);
      list.push(...k);
      continue;
    }
    if (stat.isDirectory()) {
      main(_path);
    }
  }
}
main(filePath);

for (const v of list) {
  if (typeof v === 'string') {
    const r = v.split(/\s+/);
    let type = 'post';
    let url = v;
    if (r.length > 1) {
      type = r[0].toLowerCase();
      url = r[1];
    }
    router[type](url, (ctx, next) => {
      ctx.body = JSON.stringify({
        code: 200,
        msg: 'success',
        data: [],
      });
    });
    continue;
  }
  const { method = 'post', path, data, callback } = v;
  router[method.toLowerCase()](
    path,
    callback
      ? callback.bind(this)
      : (ctx, next) => {
          ctx.status = 200;
          ctx.body = JSON.stringify(
            Object.assign(
              {
                code: 200,
                msg: 'success',
                data: [],
              },
              typeof data === 'function' ? data(ctx) : data
            )
          );
        }
  );
}

app.use(async (ctx, next) => {
  ctx.res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  //ctx.res.setHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  ctx.res.setHeader('Access-Control-Allow-Credentials', 'false');
  ctx.res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.res.setHeader('Access-Control-Allow-Methods', '*');
  ctx.res.setHeader(
    'Access-Control-Allow-Headers',
    'x-requested-with,Content-Type,token,Authorization,id'
  );
  await next();
});

app.use(
  koaBody({
    multipart: true,
    formLimit: 15000,
    formidable: {
      uploadDir: __dirname + '/public',
      hash: 'md5',
      onFileBegin: function (name, file) {
        // 重命名文件
        const ext = path.extname(file.name);
        const basename = path.basename(file.name, ext);
        const newName = `${basename}_${Date.now()}${ext}`;
        file.path = path.join(this.uploadDir, newName); // 设置新文件路径
        file.name = newName; // 设置新文件名
      },
    },
  })
);

app.use(router.routes()).use(router.allowedMethods());
app.use(koaStatic(path.join(__dirname, '/public')));
app.use(logger());

app.listen(4200, () => {
  console.log('mock server start!');
});
