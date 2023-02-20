import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    Name: Field<string>;
  };
};

const Product = (props: ProductProps): JSX.Element => (
  <div>
    <p>Product Component</p>
    <Text field={props.fields.Name} />
  </div>
);

export default withDatasourceCheck()<ProductProps>(Product);
