import basicAuth from 'basic-auth'
import { Request, Response, Next } from 'restify'
import { ApplicationError } from '~/modules/errors'
import { AuthBusiness } from './business'

export class AuthController {
  business: AuthBusiness

  constructor(business = new AuthBusiness()) {
    this.business = business
  }

  catchAll(req: Request, res: Response, next: Next) {
    const path = req.path()

    if (path.startsWith('/public')) {
      return next()
    }

    const credentials = basicAuth(req)

    if (!credentials) {
      return next(new ApplicationError('auth:missing'))
    }

    if (!this.business.basicAuth(credentials.name, credentials.pass)) {
      return next(new ApplicationError('auth:basic'))
    }

    return next()
  }
}
