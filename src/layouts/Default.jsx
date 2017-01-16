/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Navbar = require('../components/Navbar.jsx');
var Home = require('../pages/Home.jsx');

var DefaultLayout = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <Home />
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              {' © The Leadership Institute  '}
            </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
