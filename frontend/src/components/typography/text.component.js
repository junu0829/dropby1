import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.bold};
  color: black;
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;
const bold = (theme) => `
font-size: ${theme.fontSizes.h5};
font-family: ${theme.fonts.bold};
font-weight: ${theme.fontWeights.bold};
color: ${theme.colors.bg.b}
flex-wrap: wrap;
margin-top: 0px;
margin-bottom: 0px;
opacity: 1
z-index: 999
`;

const hint = (theme) => `
font-size: ${theme.fontSizes.body};
font-family: ${theme.fonts.bold};
font-weight: ${theme.fontWeights.bold};
color: #FAFAFA;
flex-wrap: wrap;
margin-top: 0px;
margin-bottom: 0px;
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  bold,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
