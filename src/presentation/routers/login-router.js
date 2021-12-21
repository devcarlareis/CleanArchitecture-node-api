const HTTPResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }
  async route (httpRequest) {
    try {
    const { email, password } = httpRequest.body 

    if(!email){
      return HTTPResponse.badRequest(new MissingParamError('email'))
    }

    if(!password){
      return HTTPResponse.badRequest(new MissingParamError('password'))
    }

    const accessToken = await this.authUseCase.auth(email, password)
    
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