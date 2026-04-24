const scriptTagPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi

function sanitizeValue(value) {
  if (typeof value === 'string') {
    return value.replace(scriptTagPattern, '').replace(/[<>]/g, '').trim()
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item))
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, sanitizeValue(nested)]),
    )
  }

  return value
}

export const sanitizeInput = (req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body)
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeValue(req.query)
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeValue(req.params)
  }
  next()
}
