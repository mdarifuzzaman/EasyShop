
import { WidgetsProvider } from '@sitecore-discover/react';
import SearchResultsRowGridComponent from './SearchResultRowGridComponent';

const SearchResultDiscoverContainer = (): JSX.Element => (
  <WidgetsProvider env= {'prod'} customerKey='11269-125757321' apiKey='01-7084ec9b-39cd657e7d6b0a5ade09b848999d9e5719ec78c0' useToken>
    <SearchResultsRowGridComponent rfkId='rfkid_7'></SearchResultsRowGridComponent>
  </WidgetsProvider>
);

export default SearchResultDiscoverContainer;
