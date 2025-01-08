
import React from "react";

import { SDKCore } from "../core.js";

const SDKContext = React.createContext<SDKCore | null>(null);

export function SDKProvider(props: { client: SDKCore, children: React.ReactNode }): React.ReactNode { 
  return (
    <SDKContext.Provider value={props.client}>
      {props.children}
    </SDKContext.Provider>
  );
}

export function useSDKContext(): SDKCore { 
  const value = React.useContext(SDKContext);
  if (value === null) {
    throw new Error("SDK not initialized. Create an instance of SDKCore and pass it to <SDKProvider />.");
  }
  return value;
}
