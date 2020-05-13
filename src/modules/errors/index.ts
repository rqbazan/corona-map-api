import errors from 'restify-errors'
import { Response } from 'restify'
import { ValidationError } from '@hapi/joi'
import definitions from './definitions.json'

interface JsonError {
  internalCode: string
  statusCode: number
  message: string
  info?: unknown
}

export class ApplicationError extends errors.InternalError {
  displayName = 'ApplicationError'

  json: JsonError

  constructor(slugOrMessage: string, info?: object) {
    super({ name: 'ApplicationError', info })

    let internalCode = slugOrMessage
    let definition = definitions[slugOrMessage]

    if (!definition) {
      internalCode = 'not-defined'

      definition = {
        statusCode: 500,
        message: slugOrMessage
      }
    }

    this.statusCode = definition.statusCode

    this.json = {
      internalCode,
      ...definition,
      info
    }
  }

  toJSON() {
    return this.json
  }
}

export function sendControllerError(res: Response, error: Error) {
  // @ts-expect-error
  if (error instanceof ValidationError) {
    // @ts-expect-error
    res.send(new ApplicationError('validation', error.details))
  } else if (error instanceof ApplicationError) {
    res.send(error)
  } else {
    res.send(new ApplicationError('unknow'))
  }
}
