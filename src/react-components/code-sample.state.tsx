import { HighlightedCode } from "codehike/code";
import React from "react";
import { SpeakeasyCodeSamplesCore } from "../core.js";
import { codeSamplesGet } from "../funcs/codeSamplesGet.js";
import { UsageSnippet } from "../models/components/usagesnippet.js";
import { GetCodeSamplesRequest } from "../models/operations/getcodesamples.js";
import { useSpeakeasyCodeSamplesContext } from "../react-query/_context.js";
import { highlightCode } from "./utils.js";

export type SpeakeasyHighlightedCode = HighlightedCode & {
  /** The snippet data from the code samples api */
  raw: UsageSnippet;
};

// Define the state shape.
export type CodeSampleState =
  | {
      status: "loading";
      error?: Error | undefined;
      snippets?: SpeakeasyHighlightedCode[] | undefined;
      selectedSnippet?: SpeakeasyHighlightedCode | undefined;
    }
  | {
      status: "success";
      error?: Error | undefined;
      snippets: SpeakeasyHighlightedCode[];
      selectedSnippet: SpeakeasyHighlightedCode;
    }
  | {
      status: "error";
      error: Error;
      snippets?: SpeakeasyHighlightedCode[] | undefined;
      selectedSnippet?: SpeakeasyHighlightedCode | undefined;
    };

type FetchSuccessPayload = {
  snippets: SpeakeasyHighlightedCode[];
  defaultLanguage?: string | undefined;
};

// Define the actions for our reducer.
type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: FetchSuccessPayload }
  | { type: "FETCH_FAILURE"; payload: Error }
  | { type: "SELECT"; payload: SafeGetSnippetParams };

type SafeGetSnippetParams = {
  operationId?: string | undefined;
  language?: string | undefined;
};

function safeGetSnippet(
  snippets: SpeakeasyHighlightedCode[],
  { operationId, language }: SafeGetSnippetParams,
): SpeakeasyHighlightedCode {
  const maybeEqual = (a: string, b: string | undefined) =>
    b === undefined || a.toLowerCase() === b.toLowerCase();

  const selectedSnippet = snippets.find(
    (s) =>
      maybeEqual(s.raw.operationId, operationId) &&
      maybeEqual(s.lang, language),
  );
  if (selectedSnippet) {
    return selectedSnippet;
  }

  console.warn(
    `Could not find snippet for operationId "${operationId}".`,
    `Falling back to to first language in snippet array.`,
  );

  return snippets[0]!;
}

const reducer: React.Reducer<CodeSampleState, Action> = (
  state: CodeSampleState,
  action: Action,
) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, status: "loading" };
    case "FETCH_SUCCESS":
      return {
        status: "success",
        snippets: action.payload.snippets,
        selectedSnippet: safeGetSnippet(action.payload.snippets, {
          language: action.payload.defaultLanguage,
        }),
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };
    case "SELECT":
      return {
        ...state,
        selectedSnippet: safeGetSnippet(state.snippets!, action.payload),
      };
    default:
      return state;
  }
};

type UseCodeSampleStateInit = {
  client?: SpeakeasyCodeSamplesCore | undefined;
  requestParams: GetCodeSamplesRequest;
  defaultLanguage?: string | undefined;
};

export const useCodeSampleState = ({
  client: clientProp,
  requestParams,
  defaultLanguage,
}: UseCodeSampleStateInit) => {
  const [state, dispatch] = React.useReducer(reducer, { status: "loading" });
  const client = useSafeSpeakeasyCodeSamplesContext(clientProp);

  const highlightSnippets = async (snippets: UsageSnippet[]) => {
    return Promise.all(
      snippets.map(async (snippet) => {
        const highlightedCode = await highlightCode(
          snippet.code,
          snippet.language,
          "github-from-css",
        );

        return { ...highlightedCode, raw: snippet };
      }),
    );
  };

  async function handleMount() {
    dispatch({ type: "FETCH_INIT" });
    const result = await codeSamplesGet(client, requestParams);

    if (!result.ok) {
      return dispatch({ type: "FETCH_FAILURE", payload: result.error });
    }

    dispatch({
      type: "FETCH_SUCCESS",
      payload: {
        snippets: await highlightSnippets(result.value.snippets),
        defaultLanguage,
      },
    });
  }

  React.useEffect(() => {
    handleMount();
  }, []);

  function selectSnippet(params: SafeGetSnippetParams) {
    dispatch({
      type: "SELECT",
      payload: {
        language: state.selectedSnippet?.raw.language,
        operationId: state.selectedSnippet?.raw.operationId,
        ...params,
      },
    });
  }

  return { state, selectSnippet };
};

/** Intended to give the user the option of providing their own client. */
export const useSafeSpeakeasyCodeSamplesContext = (
  coreClient?: SpeakeasyCodeSamplesCore,
) => {
  if (coreClient) {
    return coreClient;
  }

  try {
    const ctx = useSpeakeasyCodeSamplesContext();
    return ctx;
  } catch {
    throw new Error(
      "The Speakeasy Code Samples component must either be given an apiKey and " +
        "registryUrl, or be wrapped in a SpeakeasyCodeSamplesProvider.",
    );
  }
};
