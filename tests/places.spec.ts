import axios from './axios-instance'

describe('places module', () => {
  it('should return all the places', async () => {
    const res = await axios.get<Entitiy.Place[]>('/places')

    expect(res.data).toHaveLength(4)

    res.data.forEach(item => {
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('searchTemplate')
      expect(item).toHaveProperty('slug')
    })
  })
})
