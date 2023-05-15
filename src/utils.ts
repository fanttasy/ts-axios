function isString(val: any): val is string {
  return typeof val === 'string'
}

function isNumber(val: any): val is number {
  return typeof val === 'number'
}

function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}

function isSymbol(val: any): val is symbol {
  return typeof val === 'symbol'
}

function isUndefined(val: any): val is undefined {
  return typeof val === 'undefined'
}

function isBigint(val: any): val is bigint {
  return typeof val === 'bigint'
}

function isArray(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Array]'
}

function isPlainObject(val: any): boolean {
  if(Object.prototype.toString.call(val) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(val)
  return prototype !== null || prototype === Object.prototype
}

function isRegExp(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object RegExp]'
}

function isDate(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Date]'
}

function isNativeFunction(val: any): boolean {
  return typeof val === 'function' && /native code/.test(val.toString())
}

function randomNumber(lower: number, upper: number) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

function randomSelect<T>(targetArr: T[], quantity: number): T[] {
  const { length } = targetArr
  if(quantity > length) {
    throw new Error('The quantity can\'t be greater than the sum');
  }
  const result: T[] = []
  while(result.length < quantity) {
    const pos = Math.floor(Math.random() *(length - result.length))
    result.push(targetArr[pos])
    ;[targetArr[pos], targetArr[length - result.length]] = [targetArr[result.length], targetArr[pos]]
  }
  return result
}

function generateUUID() {
  if(typeof crypto === 'object') {
    if(typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }

    if(typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      // @ts-ignore
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (character) => {
        return (Number(character) ^ crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (character / 4))).toString(16)
      })
    }
  }

  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    let random = Math.random()
    if(timestamp > 0) {
      random = (timestamp * random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

function getURLParams(url: string) {
  const queryString = url.split('?')[1] ?? null
  if(!queryString) {
    return {}
  }
  const result: { [key: string]: string } = {}
  const paramsSplit = queryString.split('&')
  for(const item of paramsSplit) {
    const [key, value] = item.split('=');
    result[key] = value
  }

  return result
}

function objectToQueryString(obj: { [key: string]: any }): string {
  const keyValuePairs: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  }
  return keyValuePairs.join('&');
}

function sleep(interval: number) {
  return new Promise(resolve => setTimeout(resolve, interval))
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
 
  return btoa(binary)
}

export {
  isString,
  isNumber,
  isBoolean,
  isSymbol,
  isUndefined,
  isBigint,
  isArray,
  isPlainObject,
  isRegExp,
  isDate,
  isNativeFunction,
  randomNumber,
  randomSelect,
  generateUUID,
  getURLParams,
  objectToQueryString,
  sleep,
  arrayBufferToBase64
}
