import { WidgetsProvider } from '@sitecore-discover/react';
import SearchRecomm from './SearchRecomm';



const SearchRecommContainer = (): JSX.Element => (
  <WidgetsProvider env= {'prod'} customerKey='11269-125757321' apiKey='01-7084ec9b-39cd657e7d6b0a5ade09b848999d9e5719ec78c0' useToken>
    <SearchRecomm rfkId='rfkid_1' title={"Recommended Products"}></SearchRecomm>
  </WidgetsProvider>
);

export default SearchRecommContainer;
