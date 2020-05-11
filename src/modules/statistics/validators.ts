import JoiRoot from '@hapi/joi'
import JoiDate from '@hapi/joi-date'
import { config } from '~/config'

const Joi = JoiRoot.extend(JoiDate) as typeof JoiRoot

const statisticProperties = {
  affected: Joi.number().required(),
  deaths: Joi.number().required(),
  placeSlug: Joi.string().required(),
  reportedAt: Joi.date().format(config.DAY_PATTERN)
}

export const createStatisticSchema = Joi.object(statisticProperties)

export const createStatisticBodySchema = Joi.alternatives()
  .try(
    createStatisticSchema,
    Joi.array().items(createStatisticSchema.required())
  )
  .required()

export const getAllStatisticsQuerySchema = Joi.object({
  reportedAt: Joi.date().format(config.DAY_PATTERN)
})

export const updateStatisticSchema = Joi.object({
  ...statisticProperties,
  _id: Joi.string().required()
})

export const updateStatisticBodySchema = Joi.alternatives()
  .try(
    updateStatisticSchema,
    Joi.array().items(updateStatisticSchema.required())
  )
  .required()
