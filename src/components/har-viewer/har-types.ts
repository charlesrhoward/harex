// HAR file type definitions based on HTTP Archive 1.2 specification

export interface HarData {
  log: {
    version: string;
    creator: {
      name: string;
      version: string;
    };
    pages?: HarPage[];
    entries: HarEntry[];
  };
}

export interface HarPage {
  startedDateTime: string;
  id: string;
  title: string;
  pageTimings: {
    onContentLoad?: number;
    onLoad?: number;
  };
}

export interface HarEntry {
  startedDateTime: string;
  time: number;
  request: HarRequest;
  response: HarResponse;
  cache: Record<string, unknown>;
  timings: {
    blocked?: number;
    dns?: number;
    connect?: number;
    ssl?: number;
    send: number;
    wait: number;
    receive: number;
    _blocked_queueing?: number;
  };
  serverIPAddress?: string;
  connection?: string;
  pageref?: string;
}

export interface HarRequest {
  method: string;
  url: string;
  httpVersion: string;
  cookies: HarCookie[];
  headers: HarHeader[];
  queryString: HarQueryString[];
  postData?: HarPostData;
  headersSize: number;
  bodySize: number;
}

export interface HarResponse {
  status: number;
  statusText: string;
  httpVersion: string;
  cookies: HarCookie[];
  headers: HarHeader[];
  content: HarContent;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
  _transferSize?: number;
  _error?: string;
}

export interface HarCookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: string;
  httpOnly?: boolean;
  secure?: boolean;
}

export interface HarHeader {
  name: string;
  value: string;
}

export interface HarQueryString {
  name: string;
  value: string;
}

export interface HarPostData {
  mimeType: string;
  text?: string;
  params?: HarParam[];
}

export interface HarParam {
  name: string;
  value?: string;
  fileName?: string;
  contentType?: string;
}

export interface HarContent {
  size: number;
  compression?: number;
  mimeType: string;
  text?: string;
  encoding?: string;
}
