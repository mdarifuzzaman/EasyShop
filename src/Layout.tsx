/**
 * This Layout needs for SXA example.
 */
import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <Head>
        <title>{fields?.Title?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        <link rel="stylesheet" href={`${publicUrl}/css/bootstrap.min.css`} />     
        <link rel="stylesheet" href={`${publicUrl}/css/style.css`} />        
        <link rel="stylesheet" href={`${publicUrl}/css/responsive.css`} />
        
        <link rel="icon" href={`${publicUrl}/images/fevicon.png`} type="image/gif" />
        <link rel="stylesheet" href={`${publicUrl}/css/jquery.mCustomScrollbar.min.css`} />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
        <link rel="stylesheet" href={`${publicUrl}/css/owl.carousel.min.css`} />
        <link rel="stylesheet" href={`${publicUrl}/css/owl.theme.default.min.css`} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen"></link>
      </Head>

      <script src={`${publicUrl}/js/jquery.min.js`}></script>
      <script src={`${publicUrl}/js/jquery.min.js`}></script>
      <script src={`${publicUrl}/js/popper.min.js`}></script>
      <script src={`${publicUrl}/js/bootstrap.bundle.min.js`}></script>
      <script src={`${publicUrl}/js/jquery-3.0.0.min.js`}></script>
      {/* <script src={`${publicUrl}/js/plugin.js`}></script> */}
      <script src={`${publicUrl}/js/jquery.mCustomScrollbar.concat.min.js`}></script>
      {/* <script src={`${publicUrl}/js/custom.js`}></script> */}
      <script src={`${publicUrl}/js/owl.carousel.js`}></script>
      <script src="https:cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      {/* <VisitorIdentification /> */}

      {/* root placeholder for the app, which we add components to using route data */}
      {route && <Placeholder name="jss-main" rendering={route} />}
    </>
  );
};

export default Layout;
