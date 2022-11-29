import { ajax } from 'rxjs/ajax';
import { of, race } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import Cookies from 'js-cookie';
import { encryption, decrypt } from './utils';

const win: any = window;
const baseURL: string = process.env.REACT_APP_BASE_URL || '';
const basePath: string = process.env.REACT_APP_BASE_PATH || '';
const regExp = /\/index\/(.+)\/?/;
const urlRegExp = /demo/;
const aTokenRegExp = /\/adminToken(?=\/)/;
const cTokenRegExp = /\/cacToken(?=\/)/;
const noTokenRegExp = /\/noToken(?=\/)/;
const isEncrypt = process.env.REACT_APP_OPEN_ENCRYPTION === 'true';

import axios from 'axios';

const instance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  transformRequest: [
    function (data: any = {}, headers: any) {
      //console.log('request::', data);
      return isEncrypt ? encryption(data) : JSON.stringify(data);
    },
  ],
});

//
for (const v of [instance]) {
  v.interceptors.request.use(
    process.env.REACT_APP_API_ENV === 'local'
      ? (config: any) => {
          const { url, baseURL } = config;
          // Do something before request is sent
          config.url = url.replace(urlRegExp, '');
          const match = url.match(urlRegExp);
          if (match) {
            config.baseURL =
              match[1] === 'ofc' ? `${baseURL}:30210` : `${baseURL}:30250`;
          }
          return config;
        }
      : (config: any) => {
          const { headers } = config;
          const token = sessionStorage.getItem('token');
          const adminToken = Cookies.get('Admin-Token') || undefined;
          const isAToken = aTokenRegExp.test(config.url);
          const isCToken = cTokenRegExp.test(config.url);
          const isNoToken = noTokenRegExp.test(config.url);
          const bearer = isCToken ? 'bearer' : 'Bearer';
          Object.assign(
            headers.common,
            !isNoToken
              ? { Authorization: `${bearer} ${isCToken ? token : adminToken}` }
              : {}
          );
          config.url = config.url
            .replace(noTokenRegExp, '')
            .replace(aTokenRegExp, '')
            .replace(cTokenRegExp, '');
          return config;
        },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  v.interceptors.response.use(
    (response: any) => {
      // 对响应数据做点什么
      if (isEncrypt) {
        response.data = decrypt(response.data);
      }
      //console.log(response.data);
      return response;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
}

// eslint-disable-next-line
class _http {
  // _http  配合 rxjs 流式操作
  static cache: any = {
    source: {
      url: '',
      data: null,
      baseURL,
    },
  };

  static interceptors: any = {
    // eslint-disable-next-line
    beforeRequest(source: { url: string; data: any; baseURL: string }) {
      if (isEncrypt) {
        source.data = encryption(source.data);
      }
    },
  };

  static post(url: string, data: any) {
    return _http.fetch(url, data);
  }

  static get(url: string, data: any) {
    return _http.fetch(url, data, 'GET');
  }

  static fetch(url: string, data: any, method = 'POST', async = true) {
    const cache = _http.cache;
    cache.request = {
      url,
      data,
      baseURL,
    };
    _http.interceptors.beforeRequest(_http.cache.request);
    return race(
      of({
        code: 408,
        msg: '请求超时！',
      }).pipe(delay(50000)),
      ajax({
        url: `${cache.request.baseURL}${cache.request.url}`,
        method,
        async,
        body: cache.request.data,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          token: sessionStorage.getItem('access_token'),
        },
      }).pipe(
        map((rs) => {
          if (isEncrypt) {
            return { ...rs, response: decrypt(rs.response as string) };
          }
          return rs;
        })
      )
    );
  }
}

// 本地联调时，不需要tms ofc
if (process.env.APP_API_ENV === 'local') {
  instance.interceptors.request.use(
    (config: any) => {
      const { url, baseURL } = config;
      // Do something before request is sent
      config.url = url.replace(urlRegExp, '');
      const match = url.match(urlRegExp);
      if (match) {
        config.baseURL =
          match[1] === 'ofc' ? `${baseURL}:30210` : `${baseURL}:30250`;
      }
      return config;
    },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  _http.interceptors.beforeRequest = (source: {
    url: string;
    data: any;
    baseURL: string;
  }) => {
    const { url } = source;
    const match = url.match(urlRegExp);
    if (match) {
      const temp = match[1] === 'tms' ? ':30250' : ':30210';
      source.url = url.replace(urlRegExp, temp);
    }
  };
}

export default instance;
export { baseURL, basePath, instance as http, _http };
