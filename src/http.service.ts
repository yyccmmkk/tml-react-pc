import {ajax} from 'rxjs/ajax'
import {of, race} from 'rxjs'
import {delay} from 'rxjs/operators'

const baseURL: string = process.env.APP_BASE_URL || '' // 上传接口 baseUrl
const regExp = /\/index\/(.+)\/?/
const basePath = process.env.APP_BASE_PATH // 路由
const urlRegExp = /demo/
const axios = require('axios')

const vcRegExp = /\/(vcUse)\// // todo demo vc add regexp
let isVc = false
let isLogin = false
const loginRegExp = /\/login$/
const match = window.location.href.match(regExp)

const token = sessionStorage.getItem('token') || (match && match[1]) || null


const instance = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function (data: any = {}, headers: any) {
      // Do whatever you want to transform the data
      const temp = Object.keys(data).map(v => `${v}=${data[v]}`)
      Object.assign(
        headers.common,
        !isLogin
          ? {
            id: sessionStorage.getItem('biw-id'), // todo 禁止修改
            tk: sessionStorage.getItem('biw-tk'), // todo 禁止修改
            platform: !isVc ? 'in' : 'out'
          }
          : undefined
      )
      return temp.join('&')
    }
  ]
})

//
for (const v of [instance]) {
  v.interceptors.request.use(
    process.env.APP_API_ENV === 'local'
      ? (config: any) => {
        const {url, baseURL} = config
        // Do something before request is sent
        config.url = url.replace(urlRegExp, '')
        const match = url.match(urlRegExp)
        if (match) {
          config.baseURL =
            match[1] === 'ofc' ? `${baseURL}:30210` : `${baseURL}:30250`
        }
        return config
      }
      : (config: any) => {
        isLogin = loginRegExp.test(window.location.href)
        isVc = vcRegExp.test(config.url)
        config.url = config.url.replace(vcRegExp, '/')
        return config
      },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  v.interceptors.response.use(
    (response: any) => {
      // 对响应数据做点什么
      if (response.data.code === 50010) {
        alert('登录过期,请重新登录')
        sessionStorage.clear()
        setTimeout(() => {
          location.href = '/login'
          sessionStorage.clear()
        }, 2000)
      }
      return response
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
}

// eslint-disable-next-line
class _http {  // _http  配合 rxjs 流式操作
  static cache: any = {source: {url: '', data: null, baseURL}}

  static interceptors: any = {
    // eslint-disable-next-line
    beforeRequest(source: { url: string; data: any; baseURL: string }) {
    }
  }

  static post(url: string, data: any) {
    const cache = _http.cache
    cache.source = {url, data, baseURL}
    _http.interceptors.beforeRequest(_http.cache.source)
    return race(
      of({code: 408, msg: '请求超时！'}).pipe(delay(50000)),
      ajax({
        url: `${baseURL}${url}`,
        method: 'POST',
        async: true,
        body: data,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          token
        }
      })
    )
  }
}


// 本地联调时，不需要tms ofc
if (process.env.APP_API_ENV === 'local') {
  instance.interceptors.request.use(
    (config: any) => {
      const {url, baseURL} = config
      // Do something before request is sent
      config.url = url.replace(urlRegExp, '')
      const match = url.match(urlRegExp)
      if (match) {
        config.baseURL =
          match[1] === 'ofc' ? `${baseURL}:30210` : `${baseURL}:30250`
      }
      return config
    },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  _http.interceptors.beforeRequest = (source: {
    url: string
    data: any
    baseURL: string
  }) => {
    const {url} = source
    const match = url.match(urlRegExp)
    if (match) {
      const temp = match[1] === 'tms' ? ':30250' : ':30210'
      source.url = url.replace(urlRegExp, temp)
    }
  }
}


export default instance
export {baseURL, basePath, instance as http, _http}
