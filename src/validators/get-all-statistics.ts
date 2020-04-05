import { config } from '~/config'

// eslint-disable-next-line
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

export const getAllStatisticsQuerySchema = Joi.object({
  createdAt: Joi.date().format(config.DAY_PATTERN)
})
