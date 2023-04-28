import { PageController, usePageWidgets, Widget } from '@sitecore-discover/react';
import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect } from 'react';

type ProductDetailsProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ProductDetails = (props: ProductDetailsProps): JSX.Element => {
  console.log("ProductDetails props", props);
  useEffect(() => {
    PageController.getContext().setPageUri('/products');
  }, []);

    const {isLoading, data:widgets = []} = usePageWidgets();

    return (
      <div>
        <h1>Product details page</h1>
        { isLoading && <div>Loading... </div> }
        { !isLoading && widgets.map((w) => <Widget rfkId={w} key = {w} />)}
      </div>
    );
}

export default withDatasourceCheck()<ProductDetailsProps>(ProductDetails);
