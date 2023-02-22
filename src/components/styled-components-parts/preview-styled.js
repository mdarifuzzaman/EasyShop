import styled, { keyframes } from 'styled-components'

import { NavMenu, ProductCard, theme } from '@sitecore-discover/ui';

export const StyledRoot = styled(NavMenu.Root)`
  width: 800px;
  font-family: ${theme.vars.typography.fontFamilySystem};
`;

export const StyledMainList = styled(NavMenu.List)`
  all: unset;
  list-style: none;
  display: flex;
  &[data-orientation='vertical'] {
    flex-direction: column;
  }
`;

export const StyledMainListItem = styled(NavMenu.Item)`
  width: 100%;
`;

export const StyledGroupList = styled(StyledMainList)`
  display: block;
  width: 100%;
`;

export const StyledMainContent = styled(NavMenu.Content)`
  background: ${theme.vars.palette.primary.light};
  box-shadow: 2px 5px 5px 5px ${theme.vars.palette.grey['400']};
  display: inline-block;
  justify-content: center;
  left: 0;
  height: 460px;
  padding-top: 0;
  position: absolute;
  top: 30px;
  width: 100%;
  z-index: 100;
  padding-bottom: ${theme.vars.spacing.s};

  @keyframe enterFromLeft {
    from {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframe enterFromRight {
    from {
      transform: translate3d(200px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframe exitToLeft {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
  }

  @keyframe exitToRight {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(200px, 0, 0);
      opacity: 0;
    }
  }

  &[data-motion='from-start'] {
    animation: enterFromLeft 250ms ease;
  }
  &[data-motion='from-end'] {
    animation: enterFromRight 250ms ease;
  }

  &[data-motion='to-start'] {
    animation: exitToLeft 250ms ease;
  }
  &[data-motion='to-end'] {
    animation: exitToRight 250ms ease;
  }
`;

export const StyledSubContent = styled(NavMenu.SubContent)`
  display: block;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  &[data-orientation='vertical'] {
  }
  &[data-orientation='horizontal'] {
    justify-items: center;
    margin-top: -${theme.vars.spacing.s};
  }
`;

export const DefaultStyledTrigger = styled(NavMenu.Trigger)`
  background: none;
  border: 0;
  display: inline-block;
  height: 0;
  visibility: hidden;
  width: 100%;
  text-align: left;
`;

export const StyledGrid = styled(NavMenu.Content)`
  display: inline-block;
  width: 100%;
  position: absolute;
  top: 0;
  background: #fff;
  height: 468px;
  text-align: center;
`;

export const StyledSubList = styled(NavMenu.List)`
  column-gap: ${theme.vars.spacing.s};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  margin: 0;
  padding: ${theme.vars.spacing.s};
  row-gap: ${theme.vars.spacing.s};
`;

export const Group = styled(NavMenu.Item)`
  width: 0;
`;

export const StyledSubItem = styled(NavMenu.Item)`
  display: inline;
`;

export const StyledInputTrigger = styled(NavMenu.InputTrigger)`
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.vars.spacing.xs};

  &:focus {
    outline: 1px solid ${theme.vars.palette.grey['400']};
  }
`;

export const Link = styled(NavMenu.Link)`
  color: ${theme.vars.palette.primary.main};
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  &:focus {
    box-shadow: 2px 2px 4px ${theme.vars.palette.primary.main};
  }
`;

const StyledProductRoot = styled(ProductCard.Root)`
  box-shadow: 2px 2px 4px ${theme.vars.palette.grey['400']};
  max-width: 150px;
  padding: ${theme.vars.spacing.m};
  cursor: pointer;
  display: block;
  border: solid 1px transparent;
  text-align: center;
  height: 200px;
  &:focus-within {
    box-shadow: 2px 2px 4px ${theme.vars.palette.primary.main};
  }
  &:hover {
    box-shadow: 2px 2px 4px ${theme.vars.palette.primary.main};
  }
`;

const StyledProductImage = styled(ProductCard.Image)`
  width: 70%;
`;

const StyledProductName = styled(ProductCard.Name)`
  margin: 0 0 ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: 13px;
  font-weight: ${theme.vars.typography.fontSize4.fontWeight};
`;

const StyledProductContent = styled(ProductCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: ${theme.vars.typography.fontWeight};
  line-height: ${theme.vars.typography.lineHeight};
  color: ${theme.vars.palette.primary.main};
`;

const StyledProductLink = styled.a`
  text-decoration: none;
  color: ${theme.vars.palette.primary.main};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

const StyledPrice = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

export const StyledProductCard = {
  Link: StyledProductLink,
  Content: StyledProductContent,
  Image: StyledProductImage,
  Name: StyledProductName,
  Root: StyledProductRoot,
  Price: StyledPrice,
};

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  min-height: 50vh;
`;

const Rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: ${theme.vars.palette.primary.main};
  height: 50px;
  margin: auto;
  width: 50px;
`;