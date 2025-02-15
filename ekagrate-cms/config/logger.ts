export default {
  settings: {
    level: 'debug',
    prettyPrint: true,
    forceColor: true,
    redact: {
      paths: ['req.headers.authorization'],
      censor: '**********',
    },
    serializers: {
      req: (req: any) => ({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        query: req.query,
      }),
      res: (res: any) => ({
        statusCode: res.statusCode,
        headers: res.headers,
      }),
    },
  },
}; 