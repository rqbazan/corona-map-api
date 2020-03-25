import { getMongoClient } from '~/config/db/mongo'

export class PlaceModel {
  /**
   * @returns Promise<Place>
   */
  async getAllPlaces() {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const result = await db
        .collection('places')
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

  /**
   * @param {boolean} [force]
   * @returns {Promise<SearchablePlace[]>}
   */
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
        .collection('places')
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

  /**
   * @param {SearchablePlace[]} places
   * @returns {Promise<number>}
   */
  async bulkUpdate(places) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const operations = places.map(place => ({
        updateOne: {
          filter: { _id: place._id },
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
}
