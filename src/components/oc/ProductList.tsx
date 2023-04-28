import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductListProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ProductList = (props: ProductListProps): JSX.Element => (
  <div>
    <p>ProductList Component</p>
    <Text field={props.fields.heading} />
    <h1>hellow this is a product list</h1>
  </div>
);

export default withDatasourceCheck()<ProductListProps>(ProductList);
