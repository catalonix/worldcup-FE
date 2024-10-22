export interface ApiResponse<T> {
  code: number;
  message: string;
  detail?: string;
  data: T;
  failure?: string;
}

export interface Pagination<T> {
  total: number;
  result: T;
}
