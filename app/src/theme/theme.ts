export type ThemeName = "light" | "dark"

export type Theme = {
  name: string
  brandColor: string
  textColor: string
  backgroundColor: string
}

const lightTheme: Theme = {
  name: "light",
  brandColor: "#7DB3FF",
  textColor: "#4F5257",
  backgroundColor: "#F8F8F8",
}

const darkTheme: Theme = {
  name: "dark",
  brandColor: "#7DB3FF",
  textColor: "#D4D4D4",
  backgroundColor: "#2E3033",
}

export const getTheme = (theme: ThemeName): Theme => {
  return theme === "light" ? lightTheme : darkTheme
}
