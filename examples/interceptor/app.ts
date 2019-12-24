import lance from '../../src'

/**
 * 请求拦截器
 */
lance.interceptors.request.use(config => {
  config.data = { ...config.data, age: 12 }
  return config
})

// const r1 = lance.interceptors.request.use(config => {
//   config.data = { ...config.data, name: 'tom' }
//   return config
// })

// /**
//  * 响应拦截器
//  */
// lance.interceptors.response.use(res => {
//   console.log('interceptor', res)
//   // res.data.age += 'z'
//   return res
// })

// const r2 = lance.interceptors.response.use(res => {
//   res.data.age += 't'
//   return res
// })

// /**
//  * 解除拦截器
//  */
// lance.interceptors.request.eject(r1)
// lance.interceptors.response.eject(r2)

lance({
  method: 'post',
  url: '/interceptor/post',
  data: {
    foo: 'bar'
  },
  responseType: 'json',
  headers: {
    uid: 12312312,
  }
}).then(res => {
  console.log('res', res.data)
})
