const { getMongoClient } = require('../connectors/mongo')
const { config } = require('../config')

module.exports = class MongoStore {
  async save(set, onComplete) {
    const client = getMongoClient()

    try {
      await client.connect()

      const data = {
        lastRun: set.lastRun,
        migrations: set.migrations
      }

      await client
        .db(config.DATABASE_NAME)
        .collection('migrations')
        .replaceOne({}, data, { upsert: true })

      onComplete()
    } catch (error) {
      onComplete(error)
    } finally {
      await client.close()
    }
  }

  async load(onComplete) {
    const client = getMongoClient()

    try {
      await client.connect()

      const data = await client
        .db(config.DATABASE_NAME)
        .collection('migrations')
        .findOne({})

      onComplete(null, data || {})
    } catch (error) {
      onComplete(error)
    } finally {
      await client.close()
    }
  }
}
