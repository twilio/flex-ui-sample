import React from "react";
import * as Flex from "@twilio/flex-ui";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from 'react-router'

class App extends React.Component {
  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }

    return (
      <Flex.ContextProvider manager={manager}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={routeProps => (
                <Flex.AgentDesktopView route={routeProps} />
              )}
            />
            <Route
              path="/agents"
              exact
              render={routeProps => <Flex.TeamsView route={routeProps} />}
            />
          </Switch>
        </BrowserRouter>
      </Flex.ContextProvider>
    );
  }
}

export default App;
