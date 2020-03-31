import supertest, { Response } from 'supertest'
import { useDatabase } from '~/connectors/mongo'
import server from '~/server'

jest.mock('~/services/open-street-map')

describe('jobs module', () => {
  afterEach(async () => {
    await useDatabase(db => {
      return db
        .collection('places')
        .updateMany({}, { $set: { geojson: null, center: null } })
    })
  })

  it('should set geoinfo to all the places', async () => {
    let res: Response

    res = await supertest(server).get('/job/populateGeoInfo')

    expect(res.body).toEqual({ updated: 4 })

    res = await supertest(server).get('/places')

    expect(res.body).toHaveLength(4)

    res.body.forEach(place => {
      expect(place.geojson).toBeDefined()
      expect(place.center).toBeDefined()
    })
  })
})
