import type { Schema, Struct } from '@strapi/strapi';

export interface SharedContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_contacts';
  info: {
    description: 'Contact information';
    displayName: 'Contact';
  };
  options: {
    timestamps: true;
  };
  attributes: {
    defaultMessage: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    instagram: Schema.Attribute.String;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    whatsapp: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.contact': SharedContact;
    }
  }
}
