
import React from "react";

import { SpeakeasyCodeSamplesCore } from "../core.js";

const SpeakeasyCodeSamplesContext = React.createContext<SpeakeasyCodeSamplesCore | null>(null);

export function SpeakeasyCodeSamplesProvider(props: { client: SpeakeasyCodeSamplesCore, children: React.ReactNode }): React.ReactNode { 
  return (
    <SpeakeasyCodeSamplesContext.Provider value={props.client}>
      {props.children}
    </SpeakeasyCodeSamplesContext.Provider>
  );
}

export function useSpeakeasyCodeSamplesContext(): SpeakeasyCodeSamplesCore { 
  const value = React.useContext(SpeakeasyCodeSamplesContext);
  if (value === null) {
    throw new Error("SDK not initialized. Create an instance of SpeakeasyCodeSamplesCore and pass it to <SpeakeasyCodeSamplesProvider />.");
  }
  return value;
}
