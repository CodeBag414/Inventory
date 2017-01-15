/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbar = React.createClass({
  render() {
    return (
      <div className="navbar-top">
        <div className="container">
          <Link className="navbar-brand row" to="home">
            <img src="/images/logo-small.png" width="300" height="80" alt="The Leadership Institute" />
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
