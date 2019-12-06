import { LanceInstance } from './types'
import Lance from './core/Lance'
import { extend } from './helpers/utils'

function createLanceInstance(): LanceInstance {
  const context = new Lance()
  const instance = Lance.prototype.request.bind(context)
  return extend(instance, context) as LanceInstance
}

export default createLanceInstance()
