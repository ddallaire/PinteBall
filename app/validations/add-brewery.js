import { validatePresence, validateLength, validateNumber } from 'ember-changeset-validations/validators';

export default {
  breweryName: [validatePresence(true), validateLength({ min: 1, max: 256 })],
  breweryDescription: [validatePresence(true), validateLength({ min: 1, max: 1024 })],
  breweryImagePath: [validatePresence(true)],
  breweryTags: [validatePresence(true), validateLength({ min: 1, max: 1024 })]
}
