import { config } from '~/config'

// eslint-disable-next-line
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

export const statisticSchema = Joi.object({
  affected: Joi.number().required(),
  deaths: Joi.number().required(),
  placeSlug: Joi.string().required(),
  reportedAt: Joi.date().format(config.DAY_PATTERN)
})

export const createStatisticBodySchema = Joi.alternatives()
  .try(statisticSchema, Joi.array().items(statisticSchema.required()))
  .required()

export const getAllStatisticsQuerySchema = Joi.object({
  reportedAt: Joi.date().format(config.DAY_PATTERN)
})
