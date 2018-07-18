import { validatePresence, validateLength, validateNumber } from 'ember-changeset-validations/validators';

export default {
  reviewTitle: [validatePresence(true), validateLength({ min: 1, max: 256 })],
  reviewRating: [validatePresence(true), validateNumber({ positive: true, lte: 5.0, gte: 0.0, integer: false })],
  reviewContent: [validatePresence(true), validateLength({ min: 1, max: 1024 })]
}
