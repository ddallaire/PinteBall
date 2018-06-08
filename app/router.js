import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('reviews');
  this.route('beers');
  this.route('beers/show', { path: 'beers/:beer_id' });
  this.route('breweries');
  this.route('breweries/show', { path: 'breweries/:brewery_id' })
  this.route('profile');
  this.route('not-found', { path: '/*path' });
});

export default Router;
