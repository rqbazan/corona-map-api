import Joi from '@hapi/joi'

export const statisticSchema = Joi.object({
  affected: Joi.number().required(),
  deaths: Joi.number().required(),
  placeSlug: Joi.string().required()
})

export const createStatisticBodySchema = Joi.alternatives()
  .try(statisticSchema, Joi.array().items(statisticSchema.required()))
  .required()
