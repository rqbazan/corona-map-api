import { Entity, Property } from 'mikro-orm'
import { BaseEntity } from './base'

@Entity()
export class Statistic extends BaseEntity {
  @Property()
  affected: number

  @Property()
  deaths: number

  @Property()
  placeSlug: number
}
