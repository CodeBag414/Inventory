/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./layouts/Default.jsx');
// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;




ReactDOM.render(<Main />, document.body);