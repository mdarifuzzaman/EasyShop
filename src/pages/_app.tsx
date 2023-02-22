import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import { WidgetsProvider } from '@sitecore-discover/react';
import { createTheme } from '@sitecore-discover/ui';
// import SearchRecomm from 'components/SearchRecomm';
// import SearchResultComponent from 'components/SearchResultComponent';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const {style} = createTheme();
  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <div style={style}>
      <WidgetsProvider env= {'prod'} customerKey='11269-125757321' apiKey='01-7084ec9b-39cd657e7d6b0a5ade09b848999d9e5719ec78c0' useToken>
        <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
          <Component {...rest} />
        </I18nProvider>
        {/* <SearchRecomm rfkId='rfk_uid_50' pproductsToDisplay={4} title = {"A sample category"} ></SearchRecomm>
        <SearchResultComponent rfkId='rfkid_7'></SearchResultComponent> */}
      </WidgetsProvider>
    </div>
  );
}

export default App;
