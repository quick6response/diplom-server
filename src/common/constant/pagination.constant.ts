export interface PaginationPageArgument {
  page: number;
  count: number;
}

interface QueryFindAllCountInterface {
  count: number;
  rows: any[];
}

export interface ResponsePaginationData<Data> {
  count: number;
  rows: Data[];
  nextPage: null | number;
  prevPage: number;
}

export const getPagination = ({ count, page }: PaginationPageArgument) => {
  const offset = (page - 1) * count;
  return { limit: count, offset };
};

export const getNextPage = (
  parameters: PaginationPageArgument,
  query: QueryFindAllCountInterface,
): { nextPage: null | number; prevPage: number } => {
  const result: { nextPage: null | number; prevPage: number } = {
    nextPage: null,
    prevPage: parameters.page,
  };
  if (parameters.count >= query.count || parameters.count > query.rows.length) {
    return result;
  }

  result.nextPage = parameters.page + 1;
  return result;
};
