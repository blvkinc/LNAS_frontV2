/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MonthlyProductionByFarm } from '../models/monthly-production-by-farm';
import { OrderSummary } from '../models/order-summary';
import { ProductionQuantity } from '../models/production-quantity';
import { ProductionSummary } from '../models/production-summary';

@Injectable({
  providedIn: 'root',
})
export class ReportResourceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getWeeklySales
   */
  static readonly GetWeeklySalesPath = '/api/reports/sales/weekly-sales';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWeeklySales()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklySales$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<OrderSummary>>> {

    const rb = new RequestBuilder(this.rootUrl, ReportResourceService.GetWeeklySalesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OrderSummary>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWeeklySales$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklySales(params?: {
  },
  context?: HttpContext

): Observable<Array<OrderSummary>> {

    return this.getWeeklySales$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<OrderSummary>>) => r.body as Array<OrderSummary>)
    );
  }

  /**
   * Path part for operation getMonthlySales
   */
  static readonly GetMonthlySalesPath = '/api/reports/sales/monthly-sales';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMonthlySales()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMonthlySales$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<OrderSummary>>> {

    const rb = new RequestBuilder(this.rootUrl, ReportResourceService.GetMonthlySalesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OrderSummary>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMonthlySales$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMonthlySales(params?: {
  },
  context?: HttpContext

): Observable<Array<OrderSummary>> {

    return this.getMonthlySales$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<OrderSummary>>) => r.body as Array<OrderSummary>)
    );
  }

  /**
   * Path part for operation getWeeklyProduction
   */
  static readonly GetWeeklyProductionPath = '/api/reports/production/weekly-production';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWeeklyProduction()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklyProduction$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductionQuantity>>> {

    const rb = new RequestBuilder(this.rootUrl, ReportResourceService.GetWeeklyProductionPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductionQuantity>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWeeklyProduction$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklyProduction(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductionQuantity>> {

    return this.getWeeklyProduction$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductionQuantity>>) => r.body as Array<ProductionQuantity>)
    );
  }

  /**
   * Path part for operation getMonthlyProduction
   */
  static readonly GetMonthlyProductionPath = '/api/reports/production/monthly-production';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMonthlyProduction()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMonthlyProduction$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductionQuantity>>> {

    const rb = new RequestBuilder(this.rootUrl, ReportResourceService.GetMonthlyProductionPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductionQuantity>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMonthlyProduction$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMonthlyProduction(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductionQuantity>> {

    return this.getMonthlyProduction$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductionQuantity>>) => r.body as Array<ProductionQuantity>)
    );
  }

  /**
   * Path part for operation getProductionByStatus
   */
  static readonly GetProductionByStatusPath = '/api/reports/production/by-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductionByStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductionByStatus$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductionSummary>>> {

    const rb = new RequestBuilder(this.rootUrl, ReportResourceService.GetProductionByStatusPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductionSummary>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductionByStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductionByStatus(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductionSummary>> {

    return this.getProductionByStatus$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductionSummary>>) => r.body as Array<ProductionSummary>)
    );
  }

  /**
   * Path part for operation getProductionByFarm
   */
  static readonly GetProductionByFarmPath = '/api/reports/production/by-farm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductionByFarm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductionByFarm$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<MonthlyProductionByFarm>>> {

    const rb = new RequestBuilder(this.rootUrl, ReportResourceService.GetProductionByFarmPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MonthlyProductionByFarm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductionByFarm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductionByFarm(params?: {
  },
  context?: HttpContext

): Observable<Array<MonthlyProductionByFarm>> {

    return this.getProductionByFarm$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<MonthlyProductionByFarm>>) => r.body as Array<MonthlyProductionByFarm>)
    );
  }

}
