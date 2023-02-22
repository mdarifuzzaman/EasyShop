
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
    <div className='design_section layout_padding'>
      <div className='row'>
        <div className='container'>
        <div>{title && <h1 className='design_taital'>{title}</h1>}</div>
        </div>
        <div className='row'>
          <div className='col-lg-12' style={{display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center"}}>
            {products.map((p, index) => (
                <div key={`product-${index}`}>
                    <h3><a href="#" onClick={() => onProductClick({ sku: p.sku || '' })}>{p.name}</a></h3>
                    <img src={p.image_url} />
                    {p.final_price && <span>${p.final_price}</span>}
                </div>
            ))}
          </div>
        </div>
        </div>
    </div>
  );
};

const SearchRecomm = widget(RecommendationBasic, WidgetDataType.RECOMMENDATION);
export default SearchRecomm;