import supertest from 'supertest'
import { isSameDay, format } from 'date-fns'
import server from '~/server'
import { checkObjectsRequiredProps } from './helpers'

const requiredProps = ['affected', 'deaths', 'placeSlug', 'createdAt']

describe('statistics module', () => {
  it('should return last statistics', async () => {
    const res = await supertest(server).get('/statistics')

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)
  })

  it('should return statistics from 2020-03-23', async () => {
    const createdAt = new Date(2020, 2, 23)

    const res = await supertest(server)
      .get('/statistics')
      .query({
        createdAt: format(createdAt, 'yyyy-MM-dd')
      })

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    res.body.forEach(item => {
      expect(isSameDay(createdAt, new Date(item.createdAt))).toBeTruthy()
    })
  })
})
