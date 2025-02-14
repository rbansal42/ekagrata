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

export interface SharedContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_contacts';
  info: {
    description: 'Contact information';
    displayName: 'Contact';
  };
  attributes: {
    defaultMessage: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    instagram: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    description: 'Geographic location information';
    displayName: 'Location';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    coordinates: Schema.Attribute.JSON;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    state: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Search Engine Optimization settings';
    displayName: 'SEO';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_medias';
  info: {
    description: 'Social media links and handles';
    displayName: 'Social Media';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    pinterest: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.customization-options': ProductCustomizationOptions;
      'shared.contact': SharedContact;
      'shared.location': SharedLocation;
      'shared.seo': SharedSeo;
      'shared.social-media': SharedSocialMedia;
    }
  }
}
