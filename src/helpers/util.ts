const toString = Object.prototype.toString
//通过类型谓词，当判断为true时，会将参数缩小范围到该类型（Date）
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// //通过类型谓词，当判断为true时，会将参数缩小范围到该类型（Object）
// //该方法判断的object包括function、array
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

//判断普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}