import supertest from 'supertest'
import moment from 'moment'
import { ObjectId } from 'mongodb'
import { StatisticRepository } from '~/repositories/statistic'
import { useDatabase } from '~/connectors/mongo'
import server from '~/server'
import { config } from '~/config'
import { checkObjectsRequiredProps, checkObjectRequiredProps } from './helpers'

const requiredProps = ['affected', 'deaths', 'placeSlug', 'createdAt']

describe('statistics module', () => {
  let createdStatisticIds: string[]

  beforeEach(() => {
    createdStatisticIds = null
  })

  afterEach(async () => {
    if (!createdStatisticIds) {
      return
    }

    await useDatabase(db =>
      db.collection(StatisticRepository.COLLECTION_NAME).deleteMany({
        _id: { $in: createdStatisticIds.map(id => new ObjectId(id)) }
      })
    )
  })

  it('should return last statistics', async () => {
    const res = await supertest(server).get('/statistics')

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    const createdAt = '2020-03-24'

    console.log(res.body)

    res.body.forEach(item => {
      expect(moment(item.createdAt).format(config.DAY_PATTERN)).toBe(createdAt)
    })
  })

  it('should return statistics for 2020-03-23', async () => {
    const createdAt = '2020-03-23'

    const res = await supertest(server)
      .get('/statistics')
      .query({ createdAt })

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)

    res.body.forEach(item => {
      expect(moment(item.createdAt).format(config.DAY_PATTERN)).toBe(createdAt)
    })
  })

  it('should return an error when try to query w/o valid format', async () => {
    const createdAt = '2020/03/23'

    const res = await supertest(server)
      .get('/statistics')
      .query({ createdAt })

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
})
