import React from "react";
import * as Flex from "@twilio/flex-ui";
import { Route, Switch, Router } from 'react-router';
import { myReduxStore, myHistory } from "./CustomReduxStore";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }

    return (
        <Provider store={myReduxStore}>
            <Flex.ContextProvider manager={manager}>
                <Router history={myHistory}>
                    <Switch>
                        <Route path="/" exact render={routeProps => <Flex.AgentDesktopView route={routeProps} />} />
                        <Route
                            path="/agents"
                            render={routeProps => (
                                <Flex.TeamsView
                                    route={routeProps}
                                    isViewActive={routeProps.location.pathname.startsWith("/agents")}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            </Flex.ContextProvider>
        </Provider>
    );
  }
}

export default App;
