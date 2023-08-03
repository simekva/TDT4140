import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#333" : "#fff"};
    color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
  }
`;

export const lightTheme = {
  mode: "light",
};

export const darkTheme = {
  mode: "dark",
};

export const toggleTheme = (theme: any) => {
  return theme.mode === "light" ? darkTheme : lightTheme;
};
