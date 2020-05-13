import compare from 'tsscmp'
import { config } from '~/config'

export class AuthBusiness {
  basicAuth(username: string, password: string) {
    const isUsernameCorrect = compare(username, config.BASIC_AUTH_USERNAME)
    const isPasswordCorrect = compare(password, config.BASIC_AUTH_PASSWORD)

    return isUsernameCorrect && isPasswordCorrect
  }
}
