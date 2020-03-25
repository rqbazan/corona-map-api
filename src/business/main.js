import { PlaceModel } from '~/models/place'

export class MainBusiness {
  constructor(model = new PlaceModel()) {
    this.model = model
  }

  /**
   * @returns {Promise<boolean>}
   */
  async execute() {
    try {
      const places = await this.model.getSearchablePlaces()
      console.log({ places })
      return true
    } catch (error) {
      return false
    }
  }
}
