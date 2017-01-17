/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var NotificationSystem = require('react-notification-system');
var Card = require('../components/Card.jsx');
var UserInfo = require('../components/UserInfo.jsx');
var ShowResult = require('../components/ShowResult.jsx');

var lists = require('../components/bucket.json');

console.log("=============", lists);
var HomePage = React.createClass({
    _notificationSystem: null,

    _addNotification: function(msg, level) {
        this._notificationSystem.addNotification({
            message: msg,
            level: level
        });
    },componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    },
    getInitialState() {
        return { selectedAnswers: {} };
    },
    contextTypes: {
        selectedAnswers: React.PropTypes.any
    },
    getAnswers(selectedAnswers) {
        this.setState({ selectedAnswers: selectedAnswers });
    },
    render() {
        console.log("answers=================", this.state.selectedAnswers);
        return (
          <div className="container">
            <div className="row card_pos">
                <NotificationSystem ref="notificationSystem" />
                {
                    this.state.selectedAnswers.role >= 0
                     ? <div>
                           <UserInfo parish_list={lists.tlipi.parish_list}/>
                           <ShowResult questions={lists} answers={ this.state.selectedAnswers } />
                       </div>
                     : <Card questions={lists} answers={this.getAnswers} notify={this._addNotification}/>
                }
            </div>
          </div>
        );
    }
});

module.exports = HomePage;
