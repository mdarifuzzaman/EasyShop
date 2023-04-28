import { WidgetsProvider } from '@sitecore-discover/react';
import PreviewSearchProductsOnlyStyledWidget from './PreviewSearchProductsOnlyStyledWidget';
import SearchResultsRowGridComponent from './SearchResultRowGridComponent';



const PreviewSearchWidgetContainer = (): JSX.Element => (
  <WidgetsProvider env= {'prod'} customerKey='11269-125757321' apiKey='01-7084ec9b-39cd657e7d6b0a5ade09b848999d9e5719ec78c0' useToken>
    Search: 
    <PreviewSearchProductsOnlyStyledWidget rfkId='ar_01'></PreviewSearchProductsOnlyStyledWidget>
    <SearchResultsRowGridComponent  rfkId='ar_01'></SearchResultsRowGridComponent>
  </WidgetsProvider>
);

export default PreviewSearchWidgetContainer;
