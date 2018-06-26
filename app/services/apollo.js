import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ApolloService from "ember-apollo-client/services/apollo";
import { setContext } from "apollo-link-context";
import { onError } from 'apollo-link-error';

export default ApolloService.extend({
  session: service('session'),

  link: computed(function() {
    let httpLink = this._super(...arguments);

    let authLink = setContext(() =>({
      headers: {authorization: `Bearer ${this.get('session.credentials.token')}`}
    }));

    const errorHandling = onError(({ networkError }) => {
      if (networkError && networkError.statusCode === 401) {
        this.get('session').logout();
      }
    });

    const validationLink = authLink.concat(errorHandling);

    return validationLink.concat(httpLink);
  }),
});
