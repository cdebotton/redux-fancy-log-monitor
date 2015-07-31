import React, {Component, PropTypes} from "react";
import {Connector} from "react-redux";
import {bindActionCreators} from "redux";
import * as counterActions from "../actions/counterActions";

class Application extends Component {
  static propTypes = {
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        <h1>FancyLogMonitor Example Simple</h1>
        <h2>Counter: {this.props.counter}</h2>
        <button onClick={() => this.props.increase()}>
          Increase
        </button>
        <button onClick={() => this.props.decrease()}>
          Decrease
        </button>
      </div>
    );
  }
}

export default class ApplicationConnector extends Component {
  render() {
    return (
      <Connector select={(state) => ({
        counter: state.counter
      })}>
        {({dispatch, ...props}) => {
          const actions = bindActionCreators(counterActions, dispatch);

          return (
            <Application
              {...props}
              {...actions} />
          );
        }}
      </Connector>
    );
  }
}
