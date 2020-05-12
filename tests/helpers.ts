import supertest from 'supertest'
import { config } from '~/config'

export function checkObjectRequiredProps<T>(item: T, properties: string[]) {
  properties.forEach(prop => {
    expect(item).toHaveProperty(prop)
    expect(item[prop]).toBeDefined()
    expect(item[prop]).not.toBeNull()
  })
}

export function checkObjectsRequiredProps<T>(items: T[], properties: string[]) {
  items.forEach(item => checkObjectRequiredProps(item, properties))
}

export function impersonate(test: supertest.Test) {
  const credentials = `${config.USERNAME}:${config.PASSWORD}`
  const encoded = Buffer.from(credentials).toString('base64')

  return test.set('authorization', `Basic ${encoded}`)
}
