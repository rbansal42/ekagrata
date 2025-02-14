import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArtisan extends Schema.CollectionType {
  collectionName: 'artisans';
  info: {
    singularName: 'artisan';
    pluralName: 'artisans';
    displayName: 'Artisan';
    description: 'Craftspeople and their profiles';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::artisan.artisan', 'name'> & Attribute.Required;
    bio: Attribute.RichText & Attribute.Required;
    avatar: Attribute.Media & Attribute.Required;
    gallery: Attribute.Media;
    products: Attribute.Relation<
      'api::artisan.artisan',
      'oneToMany',
      'api::product.product'
    >;
    categories: Attribute.Relation<
      'api::artisan.artisan',
      'manyToMany',
      'api::category.category'
    >;
    contact: Attribute.Component<'shared.contact'> & Attribute.Required;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::artisan.artisan', 'oneToOne', 'admin::user'>;
    updatedBy: Attribute.Relation<'api::artisan.artisan', 'oneToOne', 'admin::user'>;
  };
}

export interface ApiProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: 'Handcrafted products by artisans';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    slug: Attribute.UID<'api::product.product', 'name'> & Attribute.Required;
    shortDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    longDescription: Attribute.RichText & Attribute.Required;
    price: Attribute.Decimal & Attribute.Required & Attribute.SetMinMax<{
      min: 0;
    }>;
    images: Attribute.Media & Attribute.Required;
    featuredImage: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    artisan: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::artisan.artisan'
    >;
    categories: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::category.category'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'>;
    updatedBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'>;
  };
}

export interface ApiCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: 'Product categories and craft specializations';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    slug: Attribute.UID<'api::category.category', 'name'> & Attribute.Required;
    description: Attribute.RichText;
    image: Attribute.Media & Attribute.Required;
    products: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::product.product'
    >;
    artisans: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::artisan.artisan'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    order: Attribute.Integer & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'>;
    updatedBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'>;
  };
} 