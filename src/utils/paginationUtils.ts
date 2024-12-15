// export interface PaginationParams {
//   page?: number;
//   limit?: number;
// }

// export interface PaginatedResult<T> {
//   data: T[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
// }

// export const paginate = async <T>(
//   repository: any, // The repository or model
//   params: PaginationParams,
//   queryOptions: any = {} // Additional query options
// ): Promise<PaginatedResult<T>> => {
//   const page = params.page || 1;
//   const limit = params.limit || 10;

//   const offset = (page - 1) * limit;

//   const total = await repository.count(queryOptions); // Total number of items
//   const data = await repository.findAll({
//     ...queryOptions,
//     limit,
//     offset,
//   }); // Fetch paginated data

//   return {
//     data,
//     meta: {
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     },
//   };
// };


export interface PaginationParams {
  page?: number;
  limit?: number;
}

export const paginate = async <T>(
  repositoryMethod: (options: { limit: number; offset: number }) => Promise<{ count: number; rows: T[] }>,
  params: PaginationParams
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;

  const offset = (page - 1) * limit;

  // Ensure the repository method accepts the correct arguments
  const { count: total, rows: data } = await repositoryMethod({
    limit,
    offset,
  });

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
