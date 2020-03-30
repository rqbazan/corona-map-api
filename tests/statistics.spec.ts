import { isSameDay, format } from 'date-fns'
import { checkObjectsRequiredProps } from './helpers'
import axios from './axios-instance'

const requiredProps = ['affected', 'deaths', 'placeSlug', 'createdAt']

describe('statistics module', () => {
  it('should return last statistics', async () => {
    const res = await axios.get<Entitiy.Statistic[]>('/statistics')

    expect(res.data).toHaveLength(4)

    checkObjectsRequiredProps(res.data, requiredProps)
  })

  it('should return statistics from 2020-03-23', async () => {
    const createdAt = new Date(2020, 2, 23)

    const res = await axios.get<Entitiy.Statistic[]>('/statistics', {
      params: {
        createdAt: format(createdAt, 'yyyy-MM-dd')
      }
    })

    expect(res.data).toHaveLength(4)

    checkObjectsRequiredProps(res.data, requiredProps)

    res.data.forEach(item => {
      expect(isSameDay(createdAt, new Date(item.createdAt))).toBeTruthy()
    })
  })
})
