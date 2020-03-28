import { getMongoClient } from '~/connectors/mongo'
import { GeneralMetaInfo } from './types'

export class MetaInfoModel {
  async getGeneralMetaInfo() {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const result = await db
        .collection<GeneralMetaInfo>('meta-info')
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
