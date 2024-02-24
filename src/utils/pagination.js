export const paginationFunction = ({ page = 1, size = 2 }) => {
  if (page < 1) page = 1
  if (size < 1) size = 2

  const limit = size
  const skip = (page - 1) * size // page=3 , size = 3  , limit=3 ,

  return { limit, skip }
}
