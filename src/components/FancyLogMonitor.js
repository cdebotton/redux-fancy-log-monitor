import React, {Component, PropTypes} from "react";
import Radium from "radium";

@Radium
export default class FancyLogMonitor extends Component {
  static propTypes = {
    computedStates: PropTypes.array.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleActions: PropTypes.func,
    select: PropTypes.func.isRequired
  }

  static defaultProps = {
    select: (state) => state
  }

  render() {
    return (
      <div style={StyleSheet.container}>
        <h2>FancyLogMonitor</h2>
      </div>
    );
  }
}

const StyleSheet = {
  container: {
    fontFamily: "sans-serif",
    position: "fixed",
    padding: "1rem",
    top: "1rem",
    right: "1rem",
    bottom: "1rem",
    width: "20rem",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  }
}
