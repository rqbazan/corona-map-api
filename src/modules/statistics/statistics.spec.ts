import supertest from 'supertest'
import moment from 'moment'
import {
  checkObjectsRequiredProps,
  checkObjectRequiredProps,
  impersonate
} from 'tests/helpers'
import { parseDateString } from '~/utilities/dates'
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
    const res = await supertest(server).get('/public/statistics')

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
      .get('/public/statistics')
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
      .get('/public/statistics')
      .query({ reportedAt })

    expect(res.status).toBe(422)
    expect(res.body.message).toBe('The data schema is invalid')
  })

  it.each([[undefined], [{}], [[]], [null]])(
    'should return an error when try to create with `%p` as data',
    async data => {
      const res = await impersonate(
        supertest(server)
          .post('/private/statistics')
          .send(data)
      )

      expect(res.status).toBe(422)
      expect(res.body.message).toBe('The data schema is invalid')
    }
  )

  it('should create one new statistic', async () => {
    const dataToInsert = {
      affected: 10,
      deaths: 32,
      placeSlug: 'lima'
    }

    const res = await impersonate(
      supertest(server)
        .post('/private/statistics')
        .send(dataToInsert)
    )

    createdStatisticIds = [res.body?.data?._id]

    expect(res.body.inserted).toBe(1)
    expect(res.body.data).toMatchObject(dataToInsert)
    checkObjectRequiredProps(res.body.data, ['_id'])
  })

  it('should create on new statistic with specific repotedAt', async () => {
    const reportedAt = '2020-04-01'

    const dataToInsert = {
      reportedAt,
      affected: 10,
      deaths: 32,
      placeSlug: 'lima'
    }

    const res = await impersonate(
      supertest(server)
        .post('/private/statistics')
        .send(dataToInsert)
    )

    createdStatisticIds = [res.body?.data?._id]

    expect(res.body.data.reportedAt).toBe(
      parseDateString(reportedAt).toISOString()
    )
  })

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

    const res = await impersonate(
      supertest(server)
        .post('/private/statistics')
        .send(dataToInsert)
    )

    createdStatisticIds = res.body?.data?.map(item => item._id)

    expect(res.body.inserted).toBe(3)
    expect(res.body.data).toMatchObject(dataToInsert)
    checkObjectsRequiredProps(res.body.data, ['_id'])
  })

  it('should not create when try to set an invalid place slug', async () => {
    const res = await impersonate(
      supertest(server)
        .post('/private/statistics')
        .send({
          affected: 1,
          deaths: 12,
          placeSlug: 'rusia'
        })
    )

    expect(res.status).toBe(500)
    expect(res.body.message).toBe('rusia is not a valid place slug')
  })

  it('should not create when try to set an invalid place slugs', async () => {
    const res = await impersonate(
      supertest(server)
        .post('/private/statistics')
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
    )

    expect(res.status).toBe(500)
    expect(res.body.message).toBe('rusia is not a valid place slug')
  })

  it('should update one statistic', async () => {
    const dataToInsert = {
      affected: 10,
      deaths: 32,
      placeSlug: 'lima',
      reportedAt: '2020-03-25'
    }

    let res = await impersonate(
      supertest(server)
        .post('/private/statistics')
        .send(dataToInsert)
    )

    createdStatisticIds = [res.body?.data?._id]

    const dataToUpdate = {
      _id: res.body?.data?._id,
      ...dataToInsert,
      affected: 11,
      deaths: 33
    }

    res = await impersonate(
      supertest(server)
        .put('/private/statistics')
        .send(dataToUpdate)
    )

    expect(res.body.updated).toBe(1)
    expect(res.body.data).toMatchObject(dataToUpdate)
  })

  it('should update multiple statistic', async () => {
    const dataToInsert = [
      {
        affected: 10,
        deaths: 32,
        placeSlug: 'lima',
        reportedAt: '2020-03-25'
      },
      {
        affected: 10,
        deaths: 32,
        placeSlug: 'lima',
        reportedAt: '2020-03-26'
      }
    ]

    let res = await impersonate(
      supertest(server)
        .post('/private/statistics')
        .send(dataToInsert)
    )

    createdStatisticIds = res.body.data.map(item => item._id)

    const dataToUpdate = [
      {
        _id: createdStatisticIds[0],
        ...dataToInsert[0],
        affected: 101,
        deaths: 40
      },
      {
        _id: createdStatisticIds[1],
        ...dataToInsert[1],
        affected: 100,
        deaths: 50
      }
    ]

    res = await impersonate(
      supertest(server)
        .put('/private/statistics')
        .send(dataToUpdate)
    )

    expect(res.body.updated).toBe(2)
    expect(res.body.data).toMatchObject(dataToUpdate)
  })
})
