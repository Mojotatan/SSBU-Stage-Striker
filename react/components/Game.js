import React from 'react'

const Game = props => {
  let stageList = props.stages.filter(stage => (
    stage.status === 'starter' || (props.counter && stage.status === 'counterpick')
  ))
  return(
    <div className="col-xs-12 no-mobile-gutters">
      <div className="stages row">
        {stageList.map(stage => (
          <div key={stage.name} className={stageList.length > 9 ? 'col-xs-6 col-sm-4 col-lg-3' : 'col-xs-6 col-sm-4'}>
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
}

export default Game