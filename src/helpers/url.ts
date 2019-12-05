import { isDate, isPlainObject } from './utils'

// url编码
function encode(url: string): string {
  return encodeURIComponent(url)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    // 没有params的情况
    return url
  }

  const hashIndex: number = url.indexOf('#')
  const queryIndex: number = url.indexOf('?')

  if (hashIndex !== -1) {
    url = url.substring(0, hashIndex)
  }

  const parts: string[] = [] // 用于存放参数列表： ['foo=bar', 'bar=baz']

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === undefined || value === null) {
      return
    }
    let values: any[] = []
    if (Array.isArray(value)) {
      key += '[]'
      values = value
    } else {
      values = [value]
    }
    values.forEach(val => {
      // Date类型
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  const seriesParams = parts.join('&') // 处理之后的参数序列

  if (seriesParams) {
    return queryIndex === -1 ? `${url}?${seriesParams}` : `${url}&${seriesParams}`
  }

  return url
}
