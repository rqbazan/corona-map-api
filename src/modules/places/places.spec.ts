import supertest, { Response } from 'supertest'
import { checkObjectsRequiredProps } from 'tests/helpers'
import { useDatabase } from '~/connectors/mongo'
import server from '~/server'
import { PlaceRepository } from './repository'

const requiredProps = ['name', 'searchTemplate', 'slug']

jest.mock('~/services/open-street-map')

describe('places module', () => {
  it('should return all the places', async () => {
    const res = await supertest(server).get('/places')

    expect(res.body).toHaveLength(4)

    checkObjectsRequiredProps(res.body, requiredProps)
  })

  describe('populate polygons', () => {
    afterEach(async () => {
      await useDatabase(db => {
        return db
          .collection(PlaceRepository.COLLECTION_NAME)
          .updateMany({}, { $set: { geojson: null, center: null } })
      })
    })

    it('should set geoinfo to all the places', async () => {
      let res: Response

      res = await supertest(server).get('/places/populateGeoInfo')

      expect(res.body).toEqual({ updated: 4 })

      res = await supertest(server).get('/places')

      expect(res.body).toHaveLength(4)

      checkObjectsRequiredProps(res.body, ['geojson', 'center'])
    })
  })
})
