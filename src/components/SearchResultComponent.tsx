import React from 'react';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsBreadcrumb,
  useSearchResultsSelectedFacets,
  widget,
} from '@sitecore-discover/react';
import { AccordionFacets, Breadcrumb, Pagination, ProductCard, Select, SortSelect } from '@sitecore-discover/ui';

export const SearchResultsBasic = ({
  defaultSortType = 'featured',
  defaultSortDirection = 'desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultProductsPerPage = 24,
}) => {
  /** *** Component Logic Section *******/
  /* Here we control the logic for the SearchResults. */
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
    // the following are default values
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
  } = useSearchResults(() => {
    // initialization code
    return {
      // initial values
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
  /** ** Layout Section ****/
  return (
    <>
      {isLoading && <div>Loading</div>}
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
        <div>
          <div>
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
            {/* Facets */}
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
          <div>
            {/* Sort Select */}
            <div>
              {totalItems && (
              <div>
                Showing {productsPerPage * (page - 1) + 1} - {productsPerPage * (page - 1) + products.length} of{' '}
                {totalItems} results
              </div>
              )}
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

            {/* Results */}
            <div>
              {products.map((p, index) => (
                <ProductCard.Root product={ { image_url: p.image_url, name: p.name || '', sku: p.sku || '' }} key={`product-${index}`}>
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
            <div>
              <div>
                <label>Results Per Page</label>
                <Select.Root
                  defaultValue={String(defaultProductsPerPage)}
                  onValueChange={(v) => onResultsPerPageChange({ numProducts: Number(v) })}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Viewport>
                      <Select.Item value="24">
                        <Select.ItemText>24</Select.ItemText>
                      </Select.Item>

                      <Select.Item value="48">
                        <Select.ItemText>48</Select.ItemText>
                      </Select.Item>

                      <Select.Item value="64">
                        <Select.ItemText>64</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
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
    </>
  );
};

const SearchResultComponent = widget(SearchResultsBasic, WidgetDataType.SEARCH_RESULTS);
export default SearchResultComponent;