const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object';
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<U, T>(to: U, from: T): U & T {
  for (let key in from) {
    ;(to as U & T)[key] = from[key] as any
  }
  return to as U & T
}
