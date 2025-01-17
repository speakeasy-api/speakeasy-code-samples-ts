/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { codeSamplesGet } from "../funcs/codeSamplesGet.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class CodeSamples extends ClientSDK {
  /**
   * Retrieve usage snippets
   *
   * @remarks
   * Retrieve usage snippets from an OpenAPI document stored in the registry. Supports filtering by language and operation ID.
   */
  async get(
    request: operations.GetCodeSamplesRequest,
    options?: RequestOptions,
  ): Promise<components.UsageSnippets> {
    return unwrapAsync(codeSamplesGet(
      this,
      request,
      options,
    ));
  }
}
