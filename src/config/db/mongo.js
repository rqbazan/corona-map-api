import { MongoClient } from 'mongodb'

export function getMongoClient() {
  return new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
}
