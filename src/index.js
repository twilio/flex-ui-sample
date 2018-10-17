import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import * as Flex from "@twilio/flex-ui";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const configStorageKey = "FLEX_CONFIG";
const mountNode = document.getElementById("root");

window.onload = () => {
  const predefinedConfig = window.appConfig || {};
  const runtimeConfig = getRuntimeConfig();

  const configuration = {
    ...predefinedConfig,
    ...runtimeConfig
  };

  Flex
    .progress(mountNode)
    .Manager.create(configuration)
    .then(manager => renderApp(manager))
    .catch(error => handleError(error));
};

function renderApp(manager) {
  ReactDOM.render(
    <App manager={manager} />,
    mountNode
  );
}

function handleError(error) {
  console.error("Failed to initialize Flex", error);

  const missingAccountSid = error instanceof Flex.ConfigError && error.key === "accountSid";

  if (!missingAccountSid) {
    throw error;
  }

  ReactDOM.render(
    <Flex.RuntimeLoginView
      onSuccess={(loginData, runtimeDomain) => {
        setRuntimeConfig(loginData, runtimeDomain);
        window.location.reload();
      }}
    />,
    mountNode
  );
}

function setRuntimeConfig(loginData, runtimeDomain) {
    const config = {
        serviceBaseUrl: runtimeDomain,
        sso: {
            accountSid: loginData.accountSid
        }
    };
    const serializedConfig = JSON.stringify(config);
    localStorage.setItem(configStorageKey, serializedConfig);
}

function getRuntimeConfig() {
    const serializedConfig = localStorage.getItem(configStorageKey);
    localStorage.removeItem(configStorageKey);
    const config = JSON.parse(serializedConfig || "{}");
    return config;
}

registerServiceWorker();
