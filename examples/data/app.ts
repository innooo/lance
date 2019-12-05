import lance from '../../src/lance'

/**
 * post 请求的关于参数的几种情况
 */

lance({
  method: 'post',
  url: '/data/post',
  data: {
    foo: 'bar',
  }
}).then(res => {
  console.log(res)
})

// data为空，不自动设置Content-Type header
lance({
  method: 'post',
  url: '/data/post',
}).then(res => {
  console.log(res)
})

// 设置header
lance({
  method: 'post',
  url: '/data/post',
  data: {
    foo: 'bar'
  },
  responseType: 'json',
  headers: {
    uid: 12312312,
  }
}).then(res => {
  console.log(res)
})

// data传入buffer类型值
lance({
  method: 'post',
  url: '/buffer/post',
  data: new Int32Array([21, 31])
}).then(res => {
  console.log(res)
})
