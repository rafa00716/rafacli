import { SortDirection } from "@angular/material/sort";

export interface PaginatedRequestInterface {
  take: number;
  skip: number;
  orderBy: string,
  orderDirection: SortDirection,
  [key: string]: string | number; // filters
}

export interface PaginatedResponse<T> {
    dataSource: T[];
    pageIndex: number;
    pageSize: number;
    length: number;
  }