export default async ({ strapi }) => {
  // Add request logging middleware
  strapi.server.use(async (ctx, next) => {
    const start = Date.now();
    
    // Detailed request logging
    console.log('\n=== REQUEST ===');
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.url}`);
    console.log('Headers:', JSON.stringify(ctx.headers, null, 2));
    console.log('Query:', JSON.stringify(ctx.query, null, 2));
    console.log('Body:', JSON.stringify(ctx.request.body, null, 2));
    console.log('Params:', JSON.stringify(ctx.params, null, 2));
    
    try {
      await next();
      
      const ms = Date.now() - start;
      
      // Detailed response logging
      console.log('\n=== RESPONSE ===');
      console.log(`Status: ${ctx.status}`);
      console.log(`Time: ${ms}ms`);
      console.log('Body:', JSON.stringify(ctx.body, null, 2));
      
      if (ctx.status === 404) {
        console.log('\n=== DEBUG INFO ===');
        console.log('Available Routes:', strapi.routes);
        console.log('Requested Path:', ctx.path);
        console.log('Route Params:', ctx.params);
      }
      
    } catch (error) {
      console.error('\n=== ERROR ===');
      console.error(`Error processing ${ctx.url}:`, error);
      console.error('Stack:', error.stack);
      throw error;
    }
  });

  try {
    // Find the public role
    console.log('Setting up permissions...');
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    // Delete existing permissions
    await strapi
      .query('plugin::users-permissions.permission')
      .deleteMany({ where: { role: publicRole.id } });

    // Set of permissions to update
    const permissions = {
      'api::site-config.site-config': ['find'],
      'api::product.product': ['find', 'findOne'],
      'api::artisan.artisan': ['find', 'findOne'],
      'api::category.category': ['find', 'findOne']
    };

    // Update permissions
    const permissionPromises = Object.entries(permissions).flatMap(([controller, actions]) =>
      actions.map((action) =>
        strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::${controller.split('.')[1]}.${controller.split('.')[2]}.${action}`,
            role: publicRole.id,
          },
        })
      )
    );

    await Promise.all(permissionPromises);
    console.log('Permissions setup completed');
    
  } catch (error) {
    console.error('Bootstrap process failed:', error);
    throw error;
  }
}; 