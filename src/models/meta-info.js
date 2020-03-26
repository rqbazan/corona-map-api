import { getMongoClient } from '~/config/db/mongo'

export class MetaInfoModel {
  /**
   * @returns {Promise<GeneralMetaInfo>}
   */
  async getGeneralMetaInfo() {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const result = await db
        .collection('meta-info')
        .findOne({ slug: 'general' })

      return result
    } catch (error) {
      console.error('getMetaInfo', error)
      throw error
    } finally {
      client.close()
    }
  }
}
