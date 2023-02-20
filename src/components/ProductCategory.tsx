import { Text, Field, withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductCategoryProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    Name: Field<string>;
  };
};

const ProductCategory = (props: ProductCategoryProps) => (
  <div className='newsletter_section layout_padding'>
    <Text field={props.fields.Name}></Text>
    <Placeholder name='product-category' rendering={props.rendering}></Placeholder>
  </div>
);

export default withDatasourceCheck()<ProductCategoryProps>(ProductCategory);
