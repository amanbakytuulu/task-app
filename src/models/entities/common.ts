export interface CommonListArgs {
  _start: number;
  _limit: number;
  _onlyFavorite?: boolean;
}

export interface CommonListRes<TList> {
  data: TList;
  totalCount: number;
}
