import React, { useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsBreadcrumb,
  useSearchResultsSelectedFacets,
  widget,
} from '@sitecore-discover/react';
import {
  AccordionFacets,
  Breadcrumb,
  CardViewSwitcher,
  Pagination,
  ProductCard,
  Select as SelectPrimitive,
  SortSelect,
  CARD_VIEW_GRID,
  CARD_VIEW_LIST,
} from '@sitecore-discover/ui';

const defaultCardView = CARD_VIEW_GRID;

export const SearchResultsRowGrid = ({
  defaultSortType = 'featured',
  defaultSortDirection = 'desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultProductsPerPage = 24,
}) => {
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);

  const {
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onProductClick,
      onFilterClick,
      onSortChange,
      onFacetClick,
      onClearFilters,
    },
    context: {
      sortType = defaultSortType,
      sortDirection = defaultSortDirection,
      page = defaultPage,
      productsPerPage = defaultProductsPerPage,
    },
    queryResult: {
      isLoading,
      data: {
        total_page: totalPages = 0,
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = {},
        facet_names: facetNames = [],
        content: { product: { value: products = [] } = {} } = {},
      } = {},
    },
  } = useSearchResults((query) => {
    console.log(query);
    return {
      sortType,
      sortDirection,
      page,
      productsPerPage,
      keyphrase: defaultKeyphrase,
    };
  });
  const selectedSortIndex = sortChoices.findIndex((s) => s.name === sortType && s.order === sortDirection);
  const categories = useSearchResultsBreadcrumb();
  const selectedFacetsFromApi = useSearchResultsSelectedFacets();

  return (
    <div>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
        <div>
          <Breadcrumb.Root>
            <Breadcrumb.Navigation>
              <Breadcrumb.List>
                {categories.map((c, index, { length }) => (
                  <Breadcrumb.Item key={`breadcrumb-${index}`}>
                    <Breadcrumb.Link href={c.url_path} onClick={(e) => e.preventDefault()}>
                      {c.name}
                    </Breadcrumb.Link>
                    {index < length - 1 && <Breadcrumb.Separator value="»" />}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb.List>
            </Breadcrumb.Navigation>
          </Breadcrumb.Root>
          <div className='row'>
            <div className='col-lg-3'>
              {selectedFacetsFromApi.length > 0 && <button onClick={onClearFilters}>Clear Filters</button>}
              <ul>
                {selectedFacetsFromApi.map((selectedFacet: any) =>
                  selectedFacet.values.map((v: any, index: number) => (
                    <li key={`filter-${index}`}>
                      <span>
                        {selectedFacet.name}:{v.text}
                      </span>
                      <button
                        onClick={() => onFilterClick({ facetId: selectedFacet.id, facetValueId: v.id, checked: false })}
                      >
                        X
                      </button>
                    </li>
                  )),
                )}
              </ul>
              <AccordionFacets.Root
                defaultFacetTypesExpandedList={[]}
                onFacetTypesExpandedListChange={() => {}}
                onFacetValueClick={onFacetClick}
              >
                {facetNames.map((f, index) => (
                  <AccordionFacets.Facet facetId={f} key={`facet-${index}`}>
                    <AccordionFacets.Header>
                      <AccordionFacets.Trigger>{facets[f].display_name}</AccordionFacets.Trigger>
                    </AccordionFacets.Header>
                    <AccordionFacets.Content>
                      <AccordionFacets.ValueList>
                        {facets[f].value.map((v, index) => (
                          <AccordionFacets.Item {...{ index, facetValueId: v.id }} key={`facet-item-${index}`}>
                            <AccordionFacets.ItemCheckbox>
                              <AccordionFacets.ItemCheckboxIndicator>
                                <CheckIcon />
                              </AccordionFacets.ItemCheckboxIndicator>
                            </AccordionFacets.ItemCheckbox>
                            <AccordionFacets.ItemLabel>
                              {v.text} {v.count && `(${v.count})`}
                            </AccordionFacets.ItemLabel>
                          </AccordionFacets.Item>
                        ))}
                      </AccordionFacets.ValueList>
                    </AccordionFacets.Content>
                  </AccordionFacets.Facet>
                ))}
              </AccordionFacets.Root>
            </div>
            <div className='col-lg-9'>
              <div>
                {totalItems && (
                  <div>
                    <b>{`Showing ${productsPerPage * (page - 1) + 1} - ${
                      productsPerPage * (page - 1) + products.length
                    } of ${totalItems} results`}</b>
                  </div>
                )}

                <div>
                  {/* Card View Switcher */}
                  <CardViewSwitcher.Root onValueChange={onToggle} defaultValue={defaultCardView}>
                    <CardViewSwitcher.Item value={CARD_VIEW_GRID} aria-label="Grid View">
                      <GridIcon />
                    </CardViewSwitcher.Item>
                    <CardViewSwitcher.Item value={CARD_VIEW_LIST} aria-label="List View">
                      <ListBulletIcon />
                    </CardViewSwitcher.Item>
                  </CardViewSwitcher.Root>

                  {/* Sort Select */}
                  <SortSelect.Root
                    defaultValue={selectedSortIndex > -1 ? sortChoices[selectedSortIndex] : undefined}
                    onValueChange={onSortChange}
                  >
                    <SortSelect.Trigger>
                      <SortSelect.SelectValue>
                        {selectedSortIndex > -1 ? sortChoices[selectedSortIndex].label : ''}
                      </SortSelect.SelectValue>
                      <SortSelect.Icon />
                    </SortSelect.Trigger>
                    <SortSelect.Content>
                      <SortSelect.Viewport>
                        {sortChoices.map((option, index) => (
                          <SortSelect.Option value={option} key={`sort-${index}`}>
                            <SortSelect.OptionText>{option.label}</SortSelect.OptionText>
                          </SortSelect.Option>
                        ))}
                      </SortSelect.Viewport>
                    </SortSelect.Content>
                  </SortSelect.Root>
                </div>
              </div>

              {/* Results */}
              {dir === CARD_VIEW_GRID ? (
                <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center"}}>
                  {products.map((p, index) => (
                    <ProductCard.Root product={{ image_url: p.image_url, name: p.name || '', sku: p.sku || '' }} key={`product-${index}`}>
                      <ProductCard.Image />
                      <ProductCard.Sku />
                      <ProductCard.Name>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onProductClick({ sku: p.sku || '' });
                          }}
                        >
                          {p.name}
                        </a>
                      </ProductCard.Name>
                      {p.final_price && <span>${p.final_price}</span>}
                    </ProductCard.Root>
                  ))}
                </div>
              ) : (
                <div>
                  {products.map((p, index) => (
                    <ProductCard.Root product={{ image_url: p.image_url, name: p.name || '', sku: p.sku || '' }} key={`product-${index}`}>
                      <div>
                        <ProductCard.Image />
                      </div>
                      <div>
                        <ProductCard.Name>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              onProductClick({ sku: p.sku || '' });
                            }}
                          >
                            {p.name}
                          </a>
                        </ProductCard.Name>
                        <ProductCard.Sku />

                        {p.final_price && <span>${p.final_price}</span>}
                      </div>
                    </ProductCard.Root>
                  ))}
                </div>
              )}
              <div>
                <div>
                  <label>Results Per Page</label>
                  <SelectPrimitive.Root
                    defaultValue={String(defaultProductsPerPage)}
                    onValueChange={(v) => onResultsPerPageChange({ numProducts: Number(v) })}
                  >
                    <SelectPrimitive.Trigger>
                      <SelectPrimitive.Value />
                      <SelectPrimitive.Icon />
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Content>
                      <SelectPrimitive.Viewport>
                        <SelectPrimitive.Item value="24">
                          <SelectPrimitive.ItemText>24</SelectPrimitive.ItemText>
                        </SelectPrimitive.Item>

                        <SelectPrimitive.Item value="48">
                          <SelectPrimitive.ItemText>48</SelectPrimitive.ItemText>
                        </SelectPrimitive.Item>

                        <SelectPrimitive.Item value="64">
                          <SelectPrimitive.ItemText>64</SelectPrimitive.ItemText>
                        </SelectPrimitive.Item>
                      </SelectPrimitive.Viewport>
                    </SelectPrimitive.Content>
                  </SelectPrimitive.Root>
                </div>
                <div>
                  <Pagination.Root
                    currentPage={page}
                    defaultCurrentPage={1}
                    totalPages={totalPages}
                    onPageChange={(v) => onPageNumberChange({ page: v })}
                    href={(n) => n + ''}
                  >
                    <Pagination.PrevPage onClick={(e) => e.preventDefault()}>
                      <ArrowLeftIcon />
                    </Pagination.PrevPage>
                    <Pagination.Pages>
                      {({ pages }) =>
                        pages.map(({ page }) => (
                          <Pagination.Page
                            key={page}
                            aria-label={`Page ${page}`}
                            page={page}
                            onClick={(e) => e.preventDefault()}
                          >
                            {page}
                          </Pagination.Page>
                        ))
                      }
                    </Pagination.Pages>
                    <Pagination.NextPage onClick={(e) => e.preventDefault()}>
                      <ArrowRightIcon />
                    </Pagination.NextPage>
                  </Pagination.Root>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchResultsRowGridComponent = widget(SearchResultsRowGrid, WidgetDataType.SEARCH_RESULTS);
export default SearchResultsRowGridComponent;