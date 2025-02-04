import type { Schema, Struct } from '@strapi/strapi';

export interface ProductCustomizationOptions extends Struct.ComponentSchema {
  collectionName: 'components_product_customization_options';
  info: {
    description: 'Product customization options';
    displayName: 'Customization Options';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.JSON;
    priceAdjustment: Schema.Attribute.Decimal;
    type: Schema.Attribute.Enumeration<
      ['color', 'size', 'material', 'design', 'text']
    > &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.customization-options': ProductCustomizationOptions;
    }
  }
}
