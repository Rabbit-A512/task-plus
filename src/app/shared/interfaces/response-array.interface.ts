export interface IResponseArray<T> {
  total: number;
  data: Partial<T>[];
}
