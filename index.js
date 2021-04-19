const SafeJSON = {
  parse(json, optionalFallback = undefined, optionalCallback = undefined) {
    let error = null;
    let value = optionalFallback;
    try {
      value = JSON.parse(json);
    } catch (err) {
      error = err;
    }
    if (optionalCallback) optionalCallback(error, value);
    return value;
  },

  stringify(value, optionalCallback = undefined) {
    let error = null;
    try {
      JSON.stringify(value);
    } catch (err) {
      error = err;
    }
    if (optionalCallback) optionalCallback(error);
  },

  isValid(json, optionalCallback = undefined) {
    const token = {};
    const callbackHandler = !optionalCallback ? undefined : (error, json) => {
      const valid = json !== token;
      if (optionalCallback) optionalCallback(error, valid);
    }
    const valid = this.parse(json, token, callbackHandler) !== token;
    return valid;
  }
}

module.exports = SafeJSON;
