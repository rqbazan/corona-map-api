import supertest from 'supertest'
import server from '~/server'
import { checkObjectsRequiredProps } from './helpers'

const requiredProps = ['name', 'searchTemplate', 'slug']

describe('places module', () => {
  it('should return all the places', async () => {
    const res = await supertest(server).get('/places')

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)
  })
})
