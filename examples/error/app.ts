import lance, { LanceResponseError, LanceResponse } from '../../src/index'

// 模拟404未找到api
lance({
  method: 'post',
  url: '/error/get1',
  data: {
    foo: 'bar',
  }
}).then((res: LanceResponse) => {
  console.log(res)
}).catch((err: LanceResponseError) => {
  console.log(err.message)
  console.log(err.config)
  console.log(err.request)
})

// 模拟网络错误
setTimeout(() => {
  lance({
    method: 'post',
    url: '/data/post',
  }).then((res: LanceResponse) => {
    console.log(res)
  }).catch((err: LanceResponseError) => {
    console.log(err.message)
    console.log(err.config)
    console.log(err.request)
  })
}, 5000)


// server 模拟超时错误
lance({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res: LanceResponse) => {
  console.log(res)
}).catch((err: LanceResponseError) => {
  console.log(err.message)
  console.log(err.config)
  console.log(err.request)
})

// server 模拟后台服务异常错误
lance({
  method: 'get',
  url: '/error/get',
}).then((res: LanceResponse) => {
  console.log(res)
}).catch((err: LanceResponseError) => {
  console.log(err.message)
  console.log(err.config)
  console.log(err.request)
  console.log(err.response)
})
