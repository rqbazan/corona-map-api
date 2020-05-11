import '@hapi/joi'

declare module '@hapi/joi' {
  interface DateSchema {
    format: (pattern: string) => this
  }
}
