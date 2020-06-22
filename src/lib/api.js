
export default class Api {

  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  static isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static get(url, headers={}) {
    return this.xhr(url, null, 'GET', headers);
  }

  static put(url, params, headers={}) {
    return this.xhr(url, params, 'PUT', headers)
  }

  static post(url, params, headers={}) {
    return this.xhr(url, params, 'POST', headers)
  }

  static delete(url, params, headers={}) {
    return this.xhr(url, params, 'DELETE', headers)
  }

  static xhr(url, params, verb, headers) {
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Object.assign(Api.headers(), headers)
    // options.credentials = 'omit'

    return fetch(url, options).then(resp => {
      let text = resp.text()
      let status = resp.status
      console.log("status", status)
      
      if (resp.ok) {
        return text
      }
      return text.then(err => {
        if (this.isJson(err)) {
          let errorMessage = {err: JSON.parse(err), status}
          throw errorMessage
        }

        let errorMessage = {err, status}
        throw errorMessage
      });
    }).then(text => {
      if (this.isJson(text)) {
        return JSON.parse(text)
      }
      return text
    }).catch(({err, status}) => {
      console.log("ferr", err)

      let errorMessage = {err, status}
      throw errorMessage
    })
  }
}
