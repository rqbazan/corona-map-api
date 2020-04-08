import supertest from 'supertest'
import moment from 'moment'
import {
  checkObjectsRequiredProps,
  checkObjectRequiredProps
} from 'tests/helpers'
import { StatisticRepository } from './repository'
import server from '~/server'
import { config } from '~/config'

const requiredProps = ['affected', 'deaths', 'placeSlug', 'reportedAt']

describe('statistics module', () => {
  const statisticRepository = new StatisticRepository()

  let createdStatisticIds: string[]

  beforeEach(() => {
    createdStatisticIds = null
  })

  afterEach(async () => {
    if (!createdStatisticIds) {
      return
    }

    await statisticRepository.deleteManyByIds(createdStatisticIds)
  })

  it('should return last statistics', async () => {
    const res = await supertest(server).get('/statistics')

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    const reportedAt = '2020-03-24'

    res.body.forEach(item => {
      expect(moment(item.reportedAt).format(config.DAY_PATTERN)).toBe(
        reportedAt
      )
    })
  })

  it('should return statistics for 2020-03-23', async () => {
    const reportedAt = '2020-03-23'

    const res = await supertest(server)
      .get('/statistics')
      .query({ reportedAt })

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    res.body.forEach(item => {
      expect(moment(item.reportedAt).format(config.DAY_PATTERN)).toBe(
        reportedAt
      )
    })
  })

  it('should return an error when try to query w/o valid format', async () => {
    const reportedAt = '2020/03/23'

    const res = await supertest(server)
      .get('/statistics')
      .query({ reportedAt })

    expect(res.body.error).toBeDefined()
  })

  it.each([[undefined], [{}], [[]], [null]])(
    'should return an error when try to create with `%p` as data',
    async data => {
      const res = await supertest(server)
        .post('/statistics')
        .send(data)

      expect(res.body.error).toBeDefined()
    }
  )

  it('should create one new statistic', async () => {
    const dataToInsert = {
      affected: 10,
      deaths: 32,
      placeSlug: 'lima'
    }

    const res = await supertest(server)
      .post('/statistics')
      .send(dataToInsert)

    createdStatisticIds = [res.body?.data?._id]

    expect(res.body.inserted).toBe(1)
    expect(res.body.data).toMatchObject(dataToInsert)
    checkObjectRequiredProps(res.body.data, ['_id'])
  })

  it.todo('should create on new statistic with specific repotedAt')

  it('should create several statistics', async () => {
    const dataToInsert = [
      {
        affected: 1,
        deaths: 12,
        placeSlug: 'lima'
      },
      {
        affected: 112,
        deaths: 32,
        placeSlug: 'arequipa'
      },
      {
        affected: 122,
        deaths: 31,
        placeSlug: 'la-libertad'
      }
    ]

    const res = await supertest(server)
      .post('/statistics')
      .send(dataToInsert)

    createdStatisticIds = res.body?.data?.map(item => item._id)

    expect(res.body.inserted).toBe(3)
    expect(res.body.data).toMatchObject(dataToInsert)
    checkObjectsRequiredProps(res.body.data, ['_id'])
  })

  it('should not create when try to set an invalid place slug', async () => {
    const res = await supertest(server)
      .post('/statistics')
      .send({
        affected: 1,
        deaths: 12,
        placeSlug: 'rusia'
      })

    expect(res.body.error).toContain('rusia')
  })

  it('should not create when try to set an invalid place slugs', async () => {
    const res = await supertest(server)
      .post('/statistics')
      .send([
        {
          affected: 1,
          deaths: 12,
          placeSlug: 'la-libertad'
        },
        {
          affected: 1,
          deaths: 12,
          placeSlug: 'rusia'
        }
      ])

    expect(res.body.error).toContain('rusia')
    expect(res.body.error).not.toContain('la-libertad')
  })
})
