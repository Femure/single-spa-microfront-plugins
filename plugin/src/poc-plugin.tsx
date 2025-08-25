import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: (props) => <App {...props} />,
  renderType: "createRoot",
  errorBoundary(err, info, props) {
    console.error('Microfrontend error:', err);
    return <div>Something went wrong in the plugin.</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;