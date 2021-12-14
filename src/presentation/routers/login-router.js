const HTTPResponse = require('../helpers/http-response')
module.exports = class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body){
      return HTTPResponse.serverError()
    }

    const { email, password } = httpRequest.body 
    if(!email){
      return HTTPResponse.badRequest('email')
    }
    if(!password){
      return HTTPResponse.badRequest('password')
    }
  }
}