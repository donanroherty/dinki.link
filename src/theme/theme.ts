export enum Theme {
  light,
  dark,
}

export type ThemeDefinition = {
  brandColor: string
  textColor: string
  backgroundColor: string
}

const lightTheme: ThemeDefinition = {
  brandColor: "#7DB3FF",
  textColor: "#4F5257",
  backgroundColor: "#F8F8F8",
}

const darkTheme: ThemeDefinition = {
  brandColor: "#7DB3FF",
  textColor: "#D4D4D4",
  backgroundColor: "#4F5257",
}

export const getTheme = (theme: Theme): ThemeDefinition => {
  return theme === Theme.light ? lightTheme : darkTheme
}
