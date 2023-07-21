import { ajax } from 'rxjs/ajax';
import { of, race } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import Cookies from 'js-cookie';
import { encryption, decrypt } from './utils';

const win: any = window;
const baseURL: string = process.env.REACT_APP_BASE_URL || win.location.origin;
const basePath: string = process.env.REACT_APP_BASE_PATH || '';
const regExp = /\/index\/(.+)\/?/;
const urlRegExp = /demo/;
const aTokenRegExp = /\/adminToken(?=\/)/;
const cTokenRegExp = /\/cacToken(?=\/)/;
const noTokenRegExp = /\/noToken(?=\/)/;
const isEncrypt = process.env.REACT_APP_OPEN_ENCRYPTION === 'true';
const httpTimeout = 60000;

import axios from 'axios';

const instance = axios.create({
  baseURL,
  timeout: httpTimeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    //'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    function (data: any = {}, headers: any) {
      //console.log('request::', data);
      return isEncrypt
        ? encryption(data)
        : typeof data === 'string'
        ? data
        : JSON.stringify(data); // todo h5
    },
  ],
});

//
for (const v of [instance]) {
  v.interceptors.request.use(
    (config: any) => {
      const { headers } = config;
      const token = localStorage.getItem('access_token');
      const adminToken = Cookies.get('Admin-Token') || undefined;
      const isAToken = aTokenRegExp.test(config.url);
      const isCToken = true; //cTokenRegExp.test(config.url);
      const isNoToken = noTokenRegExp.test(config.url);
      const bearer = isCToken ? 'bearer' : 'Bearer';
      //console.log(headers, ' ::headers');
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

  static get(url: string, data?: any) {
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
    let params = '';
    if (method === 'GET' && typeof data === 'object' && data !== null) {
      params = Object.entries(data).reduce(
        (acc, cur) => acc + cur.join('='),
        ''
      );
    }
    return race(
      of({
        code: 408,
        msg: '请求超时！',
      }).pipe(delay(httpTimeout)),
      ajax({
        url: `${cache.request.baseURL}${cache.request.url}`,
        method,
        async,
        body: cache.request.data,
        queryParams: params,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `bearer ${localStorage.getItem('access_token')}`,
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

export default instance;
export { baseURL, basePath, instance as http, _http };
