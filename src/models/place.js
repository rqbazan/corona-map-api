import { getMongoClient } from '~/config/db/mongo'

export class PlaceModel {
  /**
   * @returns {Promise<SearchablePlace[]>}
   */
  async getSearchablePlaces() {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const projection = {
        keywords: 1,
        name: 1,
        country: 1
      }

      const result = await db
        .collection('places')
        .find({}, { projection })
        .toArray()

      return result
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      client.close()
    }
  }
}
