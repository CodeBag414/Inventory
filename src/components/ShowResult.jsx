/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');


var ShowResult = React.createClass({
    render() {
        var m_qInfo = this.props.questions.tlipi;
        var m_aInfo = this.props.answers;
        var m_ministry;
        switch (m_aInfo.role) {
            case "0":
                m_ministry = m_qInfo.ministry_knowledge.catechist_knowledge;
                break;
            case "1":
            case "2":
            case "3":
                m_ministry = m_qInfo.ministry_knowledge.dre_youth_knowledge;
                break;
            case "4":
                m_ministry = m_qInfo.ministry_knowledge.special_knowledge;
                break;
            case "5":
                m_ministry = m_qInfo.ministry_knowledge.lector_knowledge;
                break;
            case "6":
                m_ministry = m_qInfo.ministry_knowledge.musician_knowledge;
                break;
        }
        return (
            <div className="showResult">
                <h1>Role: { m_qInfo.role.items[m_aInfo.role].item }</h1>
                <div>
                    <h2>{ m_qInfo.theological_knowledge.title }</h2>
                    <div className="line"></div>
                    {
                        m_qInfo.theological_knowledge.knowledge.map((question, index) => {
                            return (
                                <div key={index}>
                                    <h3>{ question.header }</h3>
                                    <h4>A: { question.items[m_aInfo.theological_answers[index]].item }</h4>
                                </div>
                            )
                        })
                    }
                </div>

                {
                m_aInfo.role < 7 &&
                <div>
                    <h2>{ m_qInfo.ministry_knowledge.title }</h2>
                    <div className="line"></div>
                    {
                        m_ministry.map((question, index) => {
                            return (
                                <div key={index+15}>
                                    <h3>{ question.header }</h3>
                                    {
                                        m_aInfo.ministry_answers[index].map((answers) => {
                                            return (
                                                <h4 key={answers}>A: { question.items[answers].item }</h4>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>   
                }
            </div>
        );
    }
});

module.exports = ShowResult;
