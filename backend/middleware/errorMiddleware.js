// anything thats not an actual route
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}


// error middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  // response with json
  res.json({
    message: err.message,
    // stack is not for when were in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}



export { notFound, errorHandler }