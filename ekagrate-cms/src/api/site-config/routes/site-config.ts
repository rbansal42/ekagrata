/**
 * site-config router
 */

import { factories } from '@strapi/strapi'

export default {
  routes: [
    { 
      method: 'GET',
      path: '/site-config',
      handler: 'site-config.find',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
        middlewares: [],
      },
    },
  ]
} 