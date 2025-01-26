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

export interface ProductDimensions extends Struct.ComponentSchema {
  collectionName: 'components_product_dimensions';
  info: {
    description: 'Product dimensions information';
    displayName: 'Dimensions';
  };
  attributes: {
    height: Schema.Attribute.Decimal;
    length: Schema.Attribute.Decimal & Schema.Attribute.Required;
    unit: Schema.Attribute.Enumeration<['cm', 'inch', 'm']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'cm'>;
    weight: Schema.Attribute.Decimal;
    weightUnit: Schema.Attribute.Enumeration<['g', 'kg']> &
      Schema.Attribute.DefaultTo<'g'>;
    width: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface ProductMaterials extends Struct.ComponentSchema {
  collectionName: 'components_product_materials';
  info: {
    description: 'Product materials information';
    displayName: 'Materials';
  };
  attributes: {
    additionalMaterials: Schema.Attribute.Text;
    color: Schema.Attribute.String;
    finish: Schema.Attribute.String;
    isEcoFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    primaryMaterial: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_product_specifications';
  info: {
    description: 'Product specifications';
    displayName: 'Specifications';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.customization-options': ProductCustomizationOptions;
      'product.dimensions': ProductDimensions;
      'product.materials': ProductMaterials;
      'product.specifications': ProductSpecifications;
    }
  }
}
