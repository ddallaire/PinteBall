import { validatePresence, validateLength, validateNumber } from 'ember-changeset-validations/validators';

export default {
  beerName: [validatePresence(true), validateLength({ min: 1, max: 256 })],
  beerDescription: [validatePresence(true), validateLength({ min: 1, max: 1024 })],
  beerIbu: [validatePresence(true), validateNumber({ positive: true, lte: 200, gte: 0 })],
  beerImagePath: [validatePresence(true)],
  beerAlcoholPercent: [validatePresence(true), validateNumber({ positive: true, lte: 100.0, gte: 0.0, integer: false })],
  beerBreweries: [validatePresence(true)],
  beerTags: [validatePresence(true), validateLength({ min: 1, max: 1024 })],
  beerStyle: [validatePresence(true)]
}
