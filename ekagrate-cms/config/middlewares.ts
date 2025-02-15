export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  {
    name: 'strapi::logger',
    config: {
      level: 'debug',
      logRequestBody: true,
      logRequestQuery: true,
      logResponseBody: true,
      logResponseData: true,
      exclude: ['/admin/plugins/upload'],
      hooks: {
        request: true,
        response: true,
      },
    },
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
