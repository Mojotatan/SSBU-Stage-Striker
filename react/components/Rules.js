import React from 'react'

const Rules = props => (
  <div className="col-xs-12">
    <div className="bans">
      <label htmlFor="bans">Bans</label>
      <input id="bans" value={props.bans} onChange={props.changeBans} />
    </div>
    <button className="btn toGame" onClick={props.setModeGame}>Start Game</button>
  </div>
)

export default Rules