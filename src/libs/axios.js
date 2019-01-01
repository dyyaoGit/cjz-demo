import Axios from 'axios'
import baseURL from '_conf/url'
import {
  Message
} from 'iview'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY
} from '@/libs/util'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    const CancelToken = Axios.CancelToken
    const pending = []
    const removePending = (config) => { // 取消请求操作
      for (const [index, value] of pending.entries()) {
        if (value.u === config.url + '&' + config.method + '&' + config.data) {
          value.cancel('重复请求被取消')
          pending.splice(index, 1)
        }
      }
    }
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      removePending(config)
      config.cancelToken = new CancelToken(c => {
        pending.push({
          u: config.url + '&' + config.method + '&' + config.data,
          cancel: c
        })
      })
      // Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      removePending(res.config)
      let {
        data
      } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      if (!(data instanceof Blob)) {
        if (data.code !== 200) {
          // 后端服务在个别情况下回报201，待确认
          if (data.code === 401) {
            Cookies.remove(TOKEN_KEY)
            window.location.href = '/#/login'
            Message.error('未登录，或登录失效，请登录')
          } else {
            if (data.msg) Message.error(data.msg)
          }
          if (data.code === 500) {
            window.location.href = '/#/500'
          }
          return false
        }
      }
      return data
    }, (error) => {
      if (/timeout/.test(error.toString())) {
        Message.warning('请求超时,重新刷新页面~')
      } else {
        Message.error('服务内部错误')
      }
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      withCredentials: true,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    return new Promise((resolve, reject) => {
      Axios.all(instances).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
