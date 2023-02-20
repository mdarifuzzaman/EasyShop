import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type AppSectionProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const AppSection = (props: AppSectionProps): JSX.Element => (
  <></>  
);
export default withDatasourceCheck()<AppSectionProps>(AppSection);
