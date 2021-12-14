const HTTPResponse = require('../helpers/http-response')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }
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
    this.authUseCase.auth(email, password)
    return HTTPResponse.unauthorizedError()
  }
}