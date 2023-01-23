export type HttpRequest = {
  body?: any;
  queryParams?: any;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};

export interface Router {
  route(httpRequest: HttpRequest): Promise<HttpResponse>;
}
