import path from 'path'
import { MikroORM, RequestContext } from 'mikro-orm'
import { Statistic, BaseEntity } from '~/entities'

export function getORMConnector() {
  return MikroORM.init({
    entities: [Statistic, BaseEntity],
    entitiesDirsTs: [path.join('src', 'entities')],
    dbName: process.env.DATABASE_NAME,
    type: 'mongo',
    clientUrl: process.env.MONGO_URL
  })
}

export function getORMMiddlewareConnector(orm: MikroORM) {
  return (req, res, next) => RequestContext.create(orm.em, next)
}
