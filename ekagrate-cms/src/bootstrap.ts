import seeder from './seeders';

export default async ({ strapi }) => {
  // Add request logging middleware
  strapi.server.use(async (ctx, next) => {
    const start = Date.now();
    console.log(`[Strapi] Incoming ${ctx.method} request to ${ctx.url}`);
    console.log(`[Strapi] Request headers:`, ctx.headers);
    
    try {
      await next();
      
      const ms = Date.now() - start;
      console.log(`[Strapi] Response sent for ${ctx.url} - Status: ${ctx.status} - ${ms}ms`);
    } catch (error) {
      console.error(`[Strapi] Error processing ${ctx.url}:`, error);
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

    // Run the seeder
    console.log('Starting data seeding...');
    await seeder({ strapi });
    
  } catch (error) {
    console.error('Bootstrap process failed:', error);
    throw error;
  }
}; 