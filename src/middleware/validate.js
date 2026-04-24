export const validateBody = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return next({
      statusCode: 400,
      message: 'Validation failed',
      details: parsed.error.flatten(),
    })
  }

  req.body = parsed.data
  next()
}
