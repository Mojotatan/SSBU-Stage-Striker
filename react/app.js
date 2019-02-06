import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

// components
import Game from './components/Game'
import Rules from './components/Rules'

import {extractParams, stageList} from './utility'

class Main extends React.Component {
  constructor(props) {
    super(props)
    let params = extractParams(this.props.location.search)
    let customRules = params.s ? true : false
    let customList
    if (customRules) {
      let starters = params.s.split(',').map(s => Number(s))
      let counterpicks = params.c ? params.c.split(',').map(c => Number(c)) : []
      customList = stageList.map((stage, index) => {
        if (starters.includes(index)) return Object.assign({}, stage, {status: 'starter'})
        else if (counterpicks.includes(index)) return Object.assign({}, stage, {status: 'counterpick'})
        else return Object.assign({}, stage, {status: 'banned'})
      })
    }
    this.state = {
      log: [{message: 'start', style: ''}],
      stages: customRules ? customList : stageList,
      strikes: [],
      counter: false,
      mode: customRules ? 'game' : 'rules',
      url: false
    }
    this.pushToLog = this.pushToLog.bind(this)
    this.setModeGame = this.setModeGame.bind(this)
    this.setModeRules = this.setModeRules.bind(this)
    this.makeStarter = this.makeStarter.bind(this)
    this.makeCounterpick = this.makeCounterpick.bind(this)
    this.makeBanned = this.makeBanned.bind(this)
    this.exportToUrl = this.exportToUrl.bind(this)
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
  makeStarter(e) {
    let stageList = this.state.stages
    stageList[e.target.id].status = 'starter'
    this.setState({stages: stageList, url: false})
  }
  makeCounterpick(e) {
    let stageList = this.state.stages
    stageList[e.target.id].status = 'counterpick'
    this.setState({stages: stageList, url: false})
  }
  makeBanned(e) {
    let stageList = this.state.stages
    stageList[e.target.id].status = 'banned'
    this.setState({stages: stageList, url: false})
  }
  exportToUrl() {
    let base = this.props.location.href.split('?')[0]
    let starters = []
    let counterpicks = []
    this.state.stages.forEach((stage, index) => {
      if (stage.status === 'starter') starters.push(index)
      else if (stage.status === 'counterpick') counterpicks.push(index)
    })
    this.setState({
      url: base + '?s=' + starters.join(',') + '&c=' + counterpicks.join(',')
    })
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
          makeStarter={this.makeStarter}
          makeCounterpick={this.makeCounterpick}
          makeBanned={this.makeBanned}
          exportToUrl={this.exportToUrl}
          stages={this.state.stages}
          url={this.state.url}
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
        <Game
        setModeRules={this.setModeRules}
        strike={this.strike}
        resetStrikes={this.resetStrikes}
        counter={this.state.counter}
        toggle={this.toggleCounters}
        stages={stageList}
        />
      )
    }
  }
}

ReactDOM.render((
  <BrowserRouter>
    <Switch location={location}>
      <Route path="/" component={Main} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'))