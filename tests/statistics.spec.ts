import supertest from 'supertest'
import moment from 'moment'
import server from '~/server'
import { config } from '~/config'
import { checkObjectsRequiredProps } from './helpers'

const requiredProps = ['affected', 'deaths', 'placeSlug', 'createdAt']

describe('statistics module', () => {
  it('should return last statistics', async () => {
    const createdAt = moment('2020-03-24').format(config.DAY_PATTERN)

    const res = await supertest(server).get('/statistics')

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    res.body.forEach(item => {
      expect(moment(item.createdAt).format(config.DAY_PATTERN)).toBe(createdAt)
    })
  })

  it('should return statistics from 2020-03-23', async () => {
    const createdAt = moment('2020-03-23').format(config.DAY_PATTERN)

    const res = await supertest(server)
      .get('/statistics')
      .query({ createdAt })

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    res.body.forEach(item => {
      expect(moment(item.createdAt).format(config.DAY_PATTERN)).toBe(createdAt)
    })
  })
})
