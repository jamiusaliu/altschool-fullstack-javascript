// AltSchool FullStack Karatu 2026 — Assessment 1, Part B
// Problems: https://javascript.oluwasetemi.dev/294
// Run: node solutions.js

// Problem 1 – Deep Equal
function deepEqual(objA, objB) {
  // TODO
}
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })) // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })) // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))                     // false

// Problem 2 – Object Diff
function diffObjects(oldObj, newObj) {
  // TODO
}
console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))
// { added: { city: 'Kingston' }, removed: { country: 'Jamaica' }, changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }

// Problem 3 – Deep Freeze
function deepFreeze(obj) {
  // TODO
}
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com' // should be ignored
config.debug = true                        // should be ignored
console.log(config.api.baseUrl, config.debug) // "https://x.com" false
console.log(Object.isFrozen(config.api))      // true

// Problem 4 – Private Counter Factory
function createCounter() {
  // TODO
}
const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value) // 1
console.log(counter.count) // undefined — not directly accessible

// Problem 5 – Schema Validator
function validateSchema(obj, schema) {
  // TODO
}
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema))
// []
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))
// ['age: expected number, got string', 'isAdmin: missing property']
