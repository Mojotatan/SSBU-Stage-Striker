import React from 'react'
import ReactDOM from 'react-dom'
// import {BrowserRouter, Route, Switch} from 'react-router-dom'

// components
import Log from './components/Log'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      log: ['hey', 'arnold']
    }
  }
  render() {
    return(
      <div className="container">
        <Log log={this.state.log} />
      </div>
    )
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