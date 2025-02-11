export interface PaginatedRequestInterface {
  take: number;
  skip: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
  [key: string]: string | number; //filters
}

export interface PaginatedResponse<T> {
  dataSource: T[];
  pageIndex: number;
  pageSize: number;
  length: number;
}
