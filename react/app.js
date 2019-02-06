import React from 'react'
import ReactDOM from 'react-dom'
// import {BrowserRouter, Route, Switch} from 'react-router-dom'

// components
import Game from './components/Game'
import Rules from './components/Rules'

import {stageList} from './utility'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      log: [{message: 'start', style: ''}],
      stages: stageList,// add option to load in stage list from url
      strikes: [],
      bans: 2,
      counter: false,
      mode: 'rules'
    }
    this.pushToLog = this.pushToLog.bind(this)
    this.setModeGame = this.setModeGame.bind(this)
    this.setModeRules = this.setModeRules.bind(this)
    this.changeBans = this.changeBans.bind(this)
    this.strike = this.strike.bind(this)
    this.resetStrikes = this.resetStrikes.bind(this)
    this.toggleCounters = this.toggleCounters.bind(this)
  }
  pushToLog(message, style = '') {
    this.setState({
      log: [...this.state.log, {message, style}]
    })
  }
  setModeGame() {
    this.setState({
      mode: 'game',
      counter: false,
      log: [{message: 'start', style: ''}]
    })
  }
  setModeRules() {
    this.setState({mode: 'rules'})
  }
  changeBans(e) {
    this.setState({bans: e.target.value})
  }
  strike(e) {
    if (!this.state.strikes.includes(e.target.id)) {
      this.setState({
        strikes: [...this.state.strikes, e.target.id]
      })
    }
  }
  resetStrikes() {
    this.setState({strikes: []})
  }
  toggleCounters() {
    this.setState({counter: !this.state.counter, strikes: []})
  }
  render() {
    if (this.state.mode === 'rules') {
      return(
        <div className="row">
          <Rules
          setModeGame={this.setModeGame}
          changeBans={this.changeBans}
          bans={this.state.bans}
          stages={this.state.stages}
          />
        </div>
      )
    } else if (this.state.mode === 'game') {
      let stageList = this.state.stages.filter(stage => stage.status !== 'banned').map(stage => {
        if (this.state.strikes.includes(stage.name)) {
          return Object.assign({}, stage, {strike: true})
        } else return stage
      })
      return(
        <div className="row">
          <Game
          setModeRules={this.setModeRules}
          strike={this.strike}
          resetStrikes={this.resetStrikes}
          counter={this.state.counter}
          toggle={this.toggleCounters}
          stages={stageList}
          />
        </div>
      )
    }
  }
}

ReactDOM.render((<Main />), document.getElementById('app'))

// const routing = () => (
//   <BrowserRouter>
//       <Switch location={location}>
//         <Route path="/" component={} exact={true} />
//       </Switch>
//   </BrowserRouter>
// )