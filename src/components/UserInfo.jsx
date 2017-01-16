/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Dropdown = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        value: React.PropTypes.oneOfType(
            [
                React.PropTypes.number,
                React.PropTypes.string
            ]
        ),
        valueField: React.PropTypes.string,
        labelField: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: null,
            valueField: 'value',
            labelField: 'label',
            onChange: null
        };
    },

    getInitialState: function() {
        var selected = this.getSelectedFromProps(this.props);
        return {
            selected: selected
        }
    },
    
    componentWillReceiveProps: function(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
            selected: selected
        });
    },
    
    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        } else {
            selected = props.value;
        }
        return selected;
    },

    render() {
        var self = this;
        var options = self.props.options.map(function(option, index) {
            return (
                <option key={index} value={option[self.props.valueField]}>
                    {option[self.props.labelField]}
                </option>
            )
        });
        return (
            <select id={this.props.id} 
                    className='form-control' 
                    value={this.state.selected} 
                    onChange={this.handleChange}>
                {options}
            </select>
        )
    },

    handleChange: function(e) {
        if (this.props.onChange) {
            var change = {
                oldValue: this.state.selected,
                newValue: e.target.value
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }
});

var UserInfo = React.createClass({
    render() {
        var dropDownOnChange = function(change) {
/*            alert('onChangeForSelect:\noldValue: ' + 
                    change.oldValue + 
                    '\nnewValue: ' 
                    + change.newValue);
*/
        };

        return (
          <div className="userinfo">
              <label>Full Name:</label>
              <input type="text" name="fullname" placeholder="Full Name" required/>

              <label>Email:</label>
              <input type="email" name="email" placeholder="Email Address" required/>

              <label>Choose your Parish</label>
              <Dropdown id='parish_list'
                        options={this.props.parish_list.items}
                        value='b'
                        labelField='item'
                        onChange={dropDownOnChange} />
          </div>
        );
    }
});

module.exports = UserInfo;
