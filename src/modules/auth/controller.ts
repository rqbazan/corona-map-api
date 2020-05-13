import basicAuth from 'basic-auth'
import { Request, Response, Next } from 'restify'
import { ApplicationError, sendControllerError } from '~/modules/errors'
import { AuthBusiness } from './business'

export class AuthController {
  business: AuthBusiness

  constructor(business = new AuthBusiness()) {
    this.business = business
  }

  catchAll(req: Request, res: Response, next: Next) {
    const path = req.path()

    if (path.startsWith('/public')) {
      next()
      return
    }

    try {
      const credentials = basicAuth(req)

      if (!credentials) {
        throw new ApplicationError('auth:missing')
      }

      if (!this.business.basicAuth(credentials.name, credentials.pass)) {
        throw new ApplicationError('auth:basic')
      }

      next()
    } catch (error) {
      sendControllerError(res, error)
    }
  }
}
