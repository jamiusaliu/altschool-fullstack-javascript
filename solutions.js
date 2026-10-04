function deepEqual(objA, objB) {
  if (objA === objB) return true

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.hasOwn(objB, key) || !deepEqual(objA[key], objB[key])) {
      return false
    }
  }

  return true
}
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }))
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }))
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))

function diffObjects(oldObj, newObj) {
  const result = { added: {}, removed: {}, changed: {} }
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)])

  for (const key of allKeys) {
    const inOld = Object.hasOwn(oldObj, key)
    const inNew = Object.hasOwn(newObj, key)

    if (!inOld) {
      result.added[key] = newObj[key]
    } else if (!inNew) {
      result.removed[key] = oldObj[key]
    } else if (oldObj[key] !== newObj[key]) {
      result.changed[key] = { from: oldObj[key], to: newObj[key] }
    }
  }

  return result
}
console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))

function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value)
    }
  }

  return Object.freeze(obj)
}
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com'
config.debug = true
console.log(config.api.baseUrl, config.debug)
console.log(Object.isFrozen(config.api))

function createCounter() {
  let count = 0

  return {
    increment() {
      count++
    },
    decrement() {
      count--
    },
    get value() {
      return count
    }
  }
}
const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value)
console.log(counter.count)

function validateSchema(obj, schema) {
  const errors = []

  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      errors.push(`${key}: missing property`)
    } else if (typeof obj[key] !== expectedType) {
      errors.push(`${key}: expected ${expectedType}, got ${typeof obj[key]}`)
    }
  }

  return errors
}
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema))
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))
