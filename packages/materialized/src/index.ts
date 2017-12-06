import { JsonForms } from 'jsonforms-core';

export * from './controls/materialized.boolean.control';
export * from './controls/materialized.date.control';
export * from './controls/materialized.enum.control';
export * from './controls/materialized.integer.control';
export * from './controls/materialized.number.control';
export * from './controls/materialized.text.control';
export * from './controls/materialized.textarea.control';
export * from './layouts/horizontal.layout';
export * from './layouts/vertical.layout';
export * from './layouts/group.layout';
export * from './complex/array-renderer';

export const materialize = () => {
  JsonForms.stylingRegistry.registerMany([
    {
      name: 'button',
      classNames: ['btn', 'waves-effect', 'waves-light']
    },
    {
      name: 'control',
      classNames: ['input-field']
    },
    {
      name: 'control.label',
      classNames: ['active']
    },
    {
      name: 'array.button',
      classNames: ['btn-floating', 'waves-effect', 'waves-light', 'array-button']
    },
    {
      name: 'array.layout',
      classNames: ['z-depth-3']
    },
    {
      name: 'group.layout',
      classNames: ['z-depth-3']
    },
    {
      name: 'group.label',
      classNames: ['group.label']
    },
    {
      name: 'collection',
      classNames: ['collection']
    },
    {
      name: 'item',
      classNames: ['collection-item']
    },
    // {
    //   name: 'item-active',
    //   classNames: ['active']
    // },
    {
      name: 'horizontal-layout',
      classNames: ['row']
    },
    {
      name: 'array.children',
      classNames: ['row']
    },
    {
      name: 'categorization',
      classNames: ['jsf-categorization']
    },
    {
      name: 'categorization.master',
      classNames: ['jsf-categorization-master']
    },
    {
      name: 'categorization.detail',
      classNames: ['jsf-categorization-detail']
    },
    {
      name: 'category.group',
      classNames: ['jsf-category-group']
    },
  ]);

  const calcClasses = childrenSize => {
    const colSize = Math.floor(12 / childrenSize[0]);

    return ['col', `s${colSize}`];
  };

  JsonForms.stylingRegistry.register({
    name: 'horizontal-layout-item',
    classNames: calcClasses
  });

  JsonForms.stylingRegistry.register({
    name: 'array.item',
    classNames: calcClasses
  });

  JsonForms.stylingRegistry.register({
    name: 'vertical-layout-item',
    classNames: ['vertical-layout-item']
  });
  JsonForms.stylingRegistry.deregister('select');
};

materialize();