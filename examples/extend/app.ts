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

interface ResponseData <T = any>{
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return lance<ResponseData<User>>({
    url: '/extend/user'
  })
  .then(res => res.data)
  .catch(err => console.error(err))
}

async function test<User>() {
  const user = await getUser()
  if (user) {
    console.log('zzz', user.result.name)
  }
}

test()
