import errors from 'restify-errors'
import definitions from './definitions.json'

export class ApplicationError extends errors.InternalError {
  displayName = 'ApplicationError'

  definition: {
    statusCode: number
    message: string
  }

  slug: string

  constructor(slug: string) {
    super()
    this.slug = slug
    this.definition = definitions[slug]
    if (this.definition.statusCode) {
      this.statusCode = this.definition.statusCode
    }
  }

  toJSON() {
    return {
      internalCode: this.slug,
      ...this.definition
    }
  }
}
