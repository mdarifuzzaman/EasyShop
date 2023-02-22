
import { WidgetDataType, useRecommendation, widget } from '@sitecore-discover/react';

export const RecommendationBasic = ({ title = '', productsToDisplay = 6 }) => {
  const {
    actions: { onProductClick },
    queryResult: { isLoading, isFetching, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
  } = useRecommendation((query) => {
    query.getRequest().setNumberProducts(productsToDisplay);
  });

  const ready = !isLoading && !isFetching && products.length > 0;
  if (!ready || (ready && products.length === 0)) {
    return <div></div>;
  }

  return (
    <div>
        {title && <h3>{title}</h3>}
        {products.map((p, index) => (
            <div key={`product-${index}`}>
                <h3><a href="#" onClick={() => onProductClick({ sku: p.sku || '' })}>{p.name}</a></h3>
                <img src={p.image_url} />
                {p.final_price && <span>${p.final_price}</span>}
            </div>
        ))}
    </div>
  );
};

const SearchRecomm = widget(RecommendationBasic, WidgetDataType.RECOMMENDATION);
export default SearchRecomm;