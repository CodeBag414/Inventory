/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var NotificationSystem = require('react-notification-system');

var index = 0;
var answers = {
    role: -1,
    theological_answers: [],
    ministry_answers: [],
    setMinistryAnswers(everyAnswers) {
        var res = [];
        for (var i = 0; i < everyAnswers.length; i++)
        {
            if (everyAnswers[i] == 1)
                res.push(i);
        }
        this.ministry_answers.push(res);
    }
};

var Card = React.createClass({
    getInitialState() {
        return {
            fade: false,
            info: this.props.questions.tlipi.role,
            cardType: "radio",
            selectedItems: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        };
    },componentDidMount () {
        window.addEventListener('animationend', this.fadingDone);
    },
	componentWillUnmount () {
	    window.removeEventListener('animationend', this.fadingDone);
	},
    fadingDone () {
        this.setState({ fade: false });
    },
    selectedCount(answerlist) {
        var res = 0;
        for (var i = 0; i < answerlist.length; i++)
        {
            if (answerlist[i] != -1)
                res++;
        }
        return res;
    },
    onNext() {
        if (this.selectedCount(this.state.selectedItems) == 0) {
            this.props.notify("Please select one of the following items",'error');
            return;
        }
        this.setState({ fade: true });
        this.setState({ selectedItems: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1] });
        this.setState({ cardType: "radio" });

        var m_info = this.props.questions.tlipi.theological_knowledge.knowledge;
        if (index < m_info.length) {
            answers.theological_answers.push(this.state.selectedItems[0]);
            if (answers.role === -1) {
                answers.role = this.state.selectedItems[0];
                answers.theological_answers.pop();
                this.props.notify("Please select one of anwsers for each theological-knowledge",'warning');
            }
            this.setState({ info: m_info[index++] });
        } else {
            console.log("role:::::", answers.role);
            this.setState({ cardType: "checkbox" });
            if (index - 15 < 5) {
                switch (answers.role) {
                    case "0":
                        m_info = this.props.questions.tlipi.ministry_knowledge.catechist_knowledge;
                        this.setState({ info: m_info[index++ - 15] });
                        break;
                    case "1":
                    case "2":
                    case "3":
                        m_info = this.props.questions.tlipi.ministry_knowledge.dre_youth_knowledge;
                        this.setState({ info: m_info[index++ - 15] });
                        break;
                    case "4":
                        m_info = this.props.questions.tlipi.ministry_knowledge.special_knowledge;
                        this.setState({ info: m_info[index++ - 15] });
                        break;
                    case "5":
                        m_info = this.props.questions.tlipi.ministry_knowledge.lector_knowledge;
                        this.setState({ info: m_info[index++ - 15] });
                        break;
                    case "6":
                        m_info = this.props.questions.tlipi.ministry_knowledge.musician_knowledge;
                        this.setState({ info: m_info[index++ - 15] });
                        break;
                    case "7":
                        answers.theological_answers.push(this.state.selectedItems[0]);
                        this.props.answers(answers);
                        return;
                }
                if (index == 15+1) {
                    this.props.notify("Please select multi-anwsers for each theological-knowledge",'warning');
                    answers.theological_answers.push(this.state.selectedItems[0]);
                    return;
                }
                answers.setMinistryAnswers(this.state.selectedItems);
            }
            else {
                answers.setMinistryAnswers(this.state.selectedItems);
                this.props.answers(answers);
            }
        }            
    },
    onSelect(evt) {
        console.log("input changed");
        console.log(evt.target.value);
        var selectItems = this.state.selectedItems;
        if (this.state.cardType == "radio")
            selectItems[0] = evt.target.value;
        else
            selectItems[evt.target.value] = selectItems[evt.target.value] === -1 ? 1 : -1;
           
        console.log("selectItems", selectItems);
        this.setState({
            selectedItems: selectItems
        });
        
    },
    render() {
        const fade = this.state.fade;
        return (
          <div className={fade ? 'card slideExpandUp' : 'card'}>
            <div className="card-header">
                <h2>{this.state.info.header}</h2>
            </div>
            <div className="card-body">
              <ul className="toggle-btn-grp">
                  {
                    this.state.info.items.map((item, index) => {
                        return (
                            <li key={index}>
                                <input type={this.state.cardType} name="answer" value={index} onChange={this.onSelect}
                                       checked={this.state.cardType == "radio" ? this.state.selectedItems[0] == index : 1 == this.state.selectedItems[index]}/>
                                <label className="toggle-btn">{item.item}</label>
                            </li>
                        );
                    })
                  }
              </ul>
            </div>
            <div className="card-footer">
                <button onClick={this.onNext}> Next </button>
            </div>
          </div>
      );
    }
});

module.exports = Card;
