import lance from '../../src/lance'

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

lance.request({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

lance.get('/extend/get')
lance.options('/extend/options')
lance.delete('/extend/delete')
lance.head('/extend/head')
lance.post('/extend/post', { msg: 'post' })
lance.put('/extend/put', { msg: 'put' })
lance.patch('/extend/patch', { msg: 'patch' })
lance('/extend/get')
lance({
  method: 'get',
  url: '/extend/get'
})
lance('/extend/post', {
  method: 'post',
  data: {
    msg: 'post'
  }
})
