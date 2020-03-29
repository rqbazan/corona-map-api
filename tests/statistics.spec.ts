import axios from './axios-instance'

describe('statistics module', () => {
  it('should return all the statistics', async () => {
    const res = await axios.get<Entitiy.Statistic[]>('/statistics')

    expect(res.data).toHaveLength(4)

    res.data.forEach(item => {
      expect(item).toHaveProperty('affected')
      expect(item).toHaveProperty('deaths')
      expect(item).toHaveProperty('placeSlug')
      expect(item).toHaveProperty('createdAt')
    })
  })
})
