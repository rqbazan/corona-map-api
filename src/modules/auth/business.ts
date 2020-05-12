import compare from 'tsscmp'
import { config } from '~/config'

export class AuthBusiness {
  basicAuth(username: string, password: string) {
    const isUsernameCorrect = compare(username, config.USERNAME)
    const isPasswordCorrect = compare(password, config.PASSWORD)

    return isUsernameCorrect && isPasswordCorrect
  }
}
