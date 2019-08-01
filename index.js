class SafeJSON {
  useAsync
  constructor(shouldUseAsync = false) {
    this.useAsync = shouldUseAsync
  }

  enableAsync() {
    this.useAsync = true
  }

  parse(json, optionalFallback = undefined, optionalCallback = undefined) {
    return (this.useAsync ? this.parseAsync : this.parseSync)(json, optionalFallback, optionalCallback)
  }
  stringify(json, optionalCallback = undefined) {
    return (this.useAsync ? this.stringifyAsync : this.stringifySync)(json, optionalCallback)
  }
  isValid(json, optionalCallback = undefined) {
    return (this.useAsync ? this.isValidAsync : this.isValidSync)(json, optionalCallback)
  }

  parseSync(json, optionalFallback = undefined, optionalCallback = undefined) {
    let error = null
    let value = optionalFallback
    try {
      value = JSON.parse(json)
    } catch (ex) {
      error = ex
    }
    if (optionalCallback) optionalCallback(error, value)
    return value
  }
  stringifySync(value, optionalCallback = undefined) {
    let error = null
    try {
      JSON.stringify(value)
    } catch (ex) {
      error = ex
    }
    if (optionalCallback) optionalCallback(error)
  }
  isValidSync(json, optionalCallback = undefined) {
    const token = {}
    const callbackHandler = !optionalCallback ? undefined : (error, json)=>{
      const valid = json !== token
      if (optionalCallback) optionalCallback(error, valid)
    }
    const valid = this.parseSync(json, token, callbackHandler) !== token
    return valid
  }

  async parseAsync(json, optionalFallback = undefined, optionalCallback = undefined) {
    return this.parseSync(json, optionalFallback, optionalCallback)
  }
  async stringifyAsync(json, optionalCallback = undefined) {
    return this.stringifySync(json, optionalCallback)
  }
  async isValidAsync(json, optionalCallback = undefined) {
    return this.isValidSync(json, optionalCallback)
  }
}

module.exports = SafeJSON = new SafeJSON()