import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";

import { FlexReducer, applyFlexMiddleware } from "@twilio/flex-ui";

export const myHistory = createBrowserHistory();

export interface MyStoreState {
    myApp: any;
    flex: any;
}

const defaultAppState = {
    someProp: "myStateProp"
};

export function myAppReducer(state = defaultAppState, action) {
    switch (action.type) {
        case "CUSTOM_REDUX_ACTION":
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

const reducers = combineReducers({
    flex: FlexReducer,
    myApp: myAppReducer
});

const middleware = applyMiddleware(createLogger());

export const myReduxStore = createStore(
    reducers,
    compose(
        middleware,
        applyFlexMiddleware(myHistory)
    )
);
