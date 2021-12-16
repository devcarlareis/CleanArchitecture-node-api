const HTTPResponse = require('../helpers/http-response')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }
  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body 
    if(!email){
      return HTTPResponse.badRequest('email')
    }
    if(!password){
      return HTTPResponse.badRequest('password')
    }

    const accessToken = this.authUseCase.auth(email, password)
    if(!accessToken){
      return HTTPResponse.unauthorizedError()
    }

    return HTTPResponse.ok({accessToken})
    } catch (error) {
      //console.error(error)
      return HTTPResponse.serverError()
    }
  }
}