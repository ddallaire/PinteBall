import { validatePresence, validateLength } from 'ember-changeset-validations/validators';

export default {
  commentContent: [validatePresence(true), validateLength({ min: 1, max: 1024 })],
}
