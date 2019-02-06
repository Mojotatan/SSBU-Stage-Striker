import React from 'react'

const Game = props => (
  <div className="col-xs-12">
    <div className="stages row">
      {props.stages.filter(stage => (
        stage.status === 'starter' || (props.counter && stage.status === 'counterpick')
      )).map(stage => (
        <div key={stage.name} className="col-xs-12 col-sm-6 col-lg-4">
          <img id={stage.name} onClick={props.strike} alt={stage.name} src={'assets/img/' + stage.img} />
          {stage.strike ? <div className="stricken"></div> : null}
        </div>
      ))}
    </div>
    <button className="btn resetStrikes" onClick={props.resetStrikes}>Reset Strikes</button>
    <button className="btn toggle" onClick={props.toggle}>{props.counter ? 'Reset to Game One' : 'Reset and Enable Counterpicks'}</button>
    <button className="btn toRules" onClick={props.setModeRules}>Rules Setup</button>
  </div>
)

export default Game