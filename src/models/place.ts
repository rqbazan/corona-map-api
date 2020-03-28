import { ObjectID } from 'mongodb'
import { sanitizeObject } from '~/utils/sanitize-object'
import { getMongoClient } from '~/connectors/mongo'
import { Place, SearchablePlace, GeoJsonSearchablePlace } from './types'

export class PlaceModel {
  async getAllPlaces() {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const result = await db
        .collection<Place>('places')
        .find({})
        .toArray()

      return result
    } catch (error) {
      console.error('getAllPlaces', error)
      throw error
    } finally {
      client.close()
    }
  }

  async getSearchablePlaces(force = false) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const projection = {
        searchTemplate: 1,
        name: 1,
        country: 1
      }

      const withOutGeojsonQuery = {
        $or: [{ geojson: { $exists: false } }, { geojson: null }]
      }

      const query = force ? {} : withOutGeojsonQuery

      const result = await db
        .collection<SearchablePlace>('places')
        .find(query, { projection })
        .toArray()

      return result
    } catch (error) {
      console.error('getSearchablePlaces', error)
      throw error
    } finally {
      client.close()
    }
  }

  async bulkUpdate(places: GeoJsonSearchablePlace[]) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const operations = places.map(place => ({
        updateOne: {
          filter: { _id: new ObjectID(place._id) },
          update: { $set: place }
        }
      }))

      const numOfOperations = operations?.length ?? 0

      if (numOfOperations > 0) {
        await db.collection('places').bulkWrite(operations)
      }

      return numOfOperations
    } catch (error) {
      console.error('getSearchablePlaces', error)
      throw error
    } finally {
      client.close()
    }
  }

  async updateById(place: Place) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const payload = sanitizeObject({
        searchTemplate: place.searchTemplate,
        name: place.name,
        country: place.country,
        confirmed: place.confirmed,
        deaths: place.deaths,
        location: place.location,
        geojson: place.geojson
      })

      const { modifiedCount } = await db
        .collection('places')
        .updateOne({ _id: new ObjectID(place._id) }, { $set: payload })

      return modifiedCount
    } catch (error) {
      console.error('partialUpdate', error)
      throw error
    } finally {
      client.close()
    }
  }
}
