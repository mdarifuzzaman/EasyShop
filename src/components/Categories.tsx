import { Text, Field, withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type CategoriesProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Categories = (props: CategoriesProps): JSX.Element => (
  <div style={{height: "200px", width: "100%"}}>
    <Text field={props.fields.heading}></Text>
    <Placeholder name='product-categories' rendering={props.rendering}></Placeholder>
  </div>
);

export default withDatasourceCheck()<CategoriesProps>(Categories);
