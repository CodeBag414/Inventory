/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
 var reactRouter = require('react-router');
  var Router = reactRouter.Router;
  var Route = reactRouter.Route;
  var browserHistory = reactRouter.browserHistory;
var Main = React.createClass({
  render() {
    return (
		<Router history={browserHistory}>
		    <Route name="app" path="/" handler={require('./layouts/Default.jsx')}>
		      <Route name="home" path="/" handler={require('./pages/Home.jsx')} />
		    </Route>
		</Router>
    );
  }
});

module.exports = Main;