export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      console.log(err)
      return next(new Error('Fail', { cause: 500 }))
    })
  }
}

export const globalResponse = (err, req, res, next) => {
  if (err) {
    if (req.validationErrorArr) {
      return res
        .status(err['cause']|| 400)
        .json({ message: req.validationErrorArr })
    }
    return res.status(err['cause'] || 500).json({ message: err.message })
  }
}
