import axios from './axios-instance'
import { checkObjectsRequiredProps } from './helpers'

const requiredProps = ['name', 'searchTemplate', 'slug']

describe('places module', () => {
  it('should return all the places', async () => {
    const res = await axios.get<Entitiy.Place[]>('/places')

    expect(res.data).toHaveLength(4)

    checkObjectsRequiredProps(res.data, requiredProps)
  })
})
