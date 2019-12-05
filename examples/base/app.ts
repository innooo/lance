import lance from '../../src/lance'

/**
 * get 请求的关于参数的几种情况
 */

// params中的参数值拼接到url上
lance({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})

// 参数值为数组: /base/get?foo[]=bar&foo[]=baz
lance({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 参数值为对象： /base/get?foo=
lance({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 参数值为Date： /base/get?foo=
lance({
  method: 'get',
  url: '/base/get',
  params: {
    foo: new Date()
  }
})

// 参数值包含特殊字符： /base/get?foo=@:,[]$+ (空格将被转为+)
lance({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:,[]$ '
  }
})

// 空值忽略： /base/get?foo=bar
lance({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// 去除url中的hash： /base/get?foo=bar
lance({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// 保留url中已存在的参数： /base/get?foo=bar&baz=tzk
lance({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    baz: 'tzk'
  }
})





