import React from 'react'

const Rules = props => (
  <div className="row rules">
    <div className="col-xs-12 col-sm-4">
      <div className="row">
        <div className="col-xs-12"><h2>Starters</h2></div>
        {props.stages.map((stage, index) => {
          if (stage.status === 'starter') {
            return(
              <div key={stage.name} className="col-xs-6 col-sm-12 stage">
                <img alt={stage.name} src={'assets/img/' + stage.img} />
                <div className="rule-controls">
                  <button id={index} className="btn counterpick" onClick={props.makeCounterpick}>Counterpick</button>
                  <button id={index} className="btn ban" onClick={props.makeBanned}>Ban</button>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
    <div className="col-xs-12 col-sm-4">
      <div className="row">
        <div className="col-xs-12"><h2>Counterpicks</h2></div>
        {props.stages.map((stage, index) => {
          if (stage.status === 'counterpick') {
            return(
              <div key={stage.name} className="col-xs-6 col-sm-12 stage">
                <img alt={stage.name} src={'assets/img/' + stage.img} />
                <div className="rule-controls">
                  <button id={index} className="btn starter" onClick={props.makeStarter}>Starter</button>
                  <button id={index} className="btn ban" onClick={props.makeBanned}>Ban</button>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
    <div className="col-xs-12 col-sm-4">
      <div className="row">
        <div className="col-xs-12"><h2>Banned</h2></div>
        {props.stages.map((stage, index) => {
          if (stage.status === 'banned') {
            return(
              <div key={stage.name} className="col-xs-6 col-sm-12 stage">
                <img alt={stage.name} src={'assets/img/' + stage.img} />
                <div className="rule-controls">
                  <button id={index} className="btn starter" onClick={props.makeStarter}>Starter</button>
                  <button id={index} className="btn counterpick" onClick={props.makeCounterpick}>Counterpick</button>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
    <div className="col-xs-12">
      {/* <button className="btn export" onClick={props.exportToUrl}>Export to URL</button> */}
      <button className="btn toGame" onClick={props.setModeGame}>Start Game</button>
    </div>
  </div>
)

export default Rules