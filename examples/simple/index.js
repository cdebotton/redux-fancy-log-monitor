import React from "react";
import {Provider} from "react-redux";
import {DebugPanel, DevTools} from "redux-devtools/lib/react";
import store from "./store";
import Application from "./components/Application";
import FancyLogMonitor from "../../lib";

const mount = document.getElementById("mount");

React.render((
  <Provider store={store}>
    {() => (
      <span>
        <Application />
        <DebugPanel>
          <DevTools
            store={store}
            monitor={FancyLogMonitor} />
        </DebugPanel>
      </span>
    )}
  </Provider>
), mount);
