import React, { useCallback, useState } from 'react';

import { WidgetDataType, widget } from '@sitecore-discover/react';
import { Presence, usePreviewSearchWithLocks } from '@sitecore-discover/ui';
import {
  DefaultStyledTrigger,
  Group,
  Link,
  LoaderAnimation,
  LoaderContainer,
  SearchGroupHeading,
  StyledGrid,
  StyledGroupList,
  StyledInputTrigger,
  StyledMainContent,
  StyledMainList,
  StyledMainListItem,
  StyledProductCard,
  StyledRoot,
  StyledSubContent,
  StyledSubItem,
  StyledSubList,
  StyledTrigger,
} from './styled-components-parts/preview-styled';

export const PreviewSearchProductsOnlyStyled = ({ defaultProductsPerPage = 6 }) => {
  const {
    setLock,
    trendingCategoriesToShow,
    categoriesToShow,
    suggestionsToShow,
    context: { productsPerPage = defaultProductsPerPage },
    actions: {
      onKeyphraseChange,
      onCategoryChange,
      onSuggestionChange,
      onTrendingCategoryChange,
      onProductClick,
    },
    queryResult: {
      isFetching,
      isLoading,
      data: { content: { product: { value: products = [] } = {} } = {} } = {},
    },
  } = usePreviewSearchWithLocks((query: any) => {
    query.getRequest().setNumberProducts(productsPerPage);
    return {
      productsPerPage,
    };
  });

  const keyphraseHandler = useCallback((event) => {
    const target = event.target;
    setLock(false);
    setActiveItem('defaultProductsResults');
    onKeyphraseChange({ keyphrase: target.value });
  }, []);

  const trendingCategoryHandler = useCallback((text: any) => {
    setLock(false);
    setActiveItem(text);
    onTrendingCategoryChange({ trendingCategory: text });
  }, []);

  const categoryHandler = useCallback((text: any) => {
    setLock(true);
    setActiveItem(text);
    onCategoryChange({ category: text });
  }, []);

  const suggestionHandler = useCallback((text: any) => {
    setLock(true);
    setActiveItem(text);
    onSuggestionChange({ suggestion: text });
  }, []);

  const loading = isLoading || isFetching;
  const [activeItem, setActiveItem] = useState('defaultProductsResults');
  return (
    <div className="row">
      <div className="col-lg-12">
      <StyledRoot>
      <StyledMainList>
        <StyledMainListItem>
          <StyledInputTrigger onKeyUp={keyphraseHandler} autoComplete="off" />
          <StyledMainContent>
            {loading && (
              <LoaderContainer>
                <Presence present={loading}>
                  <LoaderAnimation
                    aria-busy={loading}
                    aria-hidden={!loading}
                    focusable="false"
                    role="progressbar"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                  </LoaderAnimation>
                </Presence>
              </LoaderContainer>
            )}
            {!loading && (
              <StyledSubContent orientation="vertical" value={activeItem}>
                <StyledGroupList>
                  {trendingCategoriesToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Trending Categories</SearchGroupHeading>
                      {trendingCategoriesToShow.map(({ text }: any) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onMouseOver={(e: any) => {
                              const { target } = e;
                              target.focus();
                            }}
                            onFocus={() => trendingCategoryHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link
                                    href="#"
                                    onClick={(e: any) => {
                                      e.preventDefault();
                                      onProductClick({ sku: p.sku || '' });
                                      // add redirection or any action
                                    }}
                                  >
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}

                  {categoriesToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Categories</SearchGroupHeading>
                      {categoriesToShow.map(({ text }: any) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onMouseOver={(e: any) => {
                              const { target } = e;
                              target.focus();
                            }}
                            onFocus={() => categoryHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link href="#">
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                  {suggestionsToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Suggestions</SearchGroupHeading>
                      {suggestionsToShow.map(({ text }: any) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onMouseOver={(e: any) => {
                              const { target } = e;
                              target.focus();
                            }}
                            onFocus={() => suggestionHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link href="#">
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                  {/* ul */}
                  <Group value="defaultProductsResults" key="defaultProductsResults">
                    {/* li */}
                    <DefaultStyledTrigger aria-hidden />
                    <StyledGrid>
                      <StyledSubList>
                        {/* ul */}
                        {products.map((p, i) => (
                          <StyledSubItem key={i.toString()}>
                            {/* li */}
                            <Link href="#">
                              <StyledProductCard.Root product={p}>
                                <StyledProductCard.Image />
                                <StyledProductCard.Name />
                                {p.final_price && <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>}
                              </StyledProductCard.Root>
                            </Link>
                          </StyledSubItem>
                        ))}
                      </StyledSubList>
                    </StyledGrid>
                  </Group>
                </StyledGroupList>
              </StyledSubContent>
            )}
          </StyledMainContent>
        </StyledMainListItem>
      </StyledMainList>
    </StyledRoot>
      </div>
    </div>
  );
};
const PreviewSearchProductsOnlyStyledWidget = widget(
  PreviewSearchProductsOnlyStyled,
  WidgetDataType.PREVIEW_SEARCH
);
export default PreviewSearchProductsOnlyStyledWidget;
