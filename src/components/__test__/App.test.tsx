import React from "react"
import { render, fireEvent } from "@testing-library/react"
import App, { THEME_ANIM_DURATION } from "../App"
import { rgbToHex } from "../../utils"
import "jest-styled-components"
import { getTheme } from "../../theme/theme"

it("responds correctly to theme change", async () => {
  const { container, getByRole } = render(<App />)

  const lightBGColor = getTheme("light").backgroundColor.toLowerCase()
  const darkBGColor = getTheme("dark").backgroundColor.toLowerCase()
  const lightTextColor = getTheme("light").textColor.toLowerCase()
  const darkTextColor = getTheme("dark").textColor.toLowerCase()

  expect(
    rgbToHex(
      window.getComputedStyle(container.firstElementChild as HTMLElement)
        .backgroundColor
    ).toLowerCase()
  ).toMatch(lightBGColor)

  expect(
    rgbToHex(
      window.getComputedStyle(container.firstElementChild as HTMLElement).color
    ).toLowerCase()
  ).toMatch(lightTextColor)

  fireEvent.click(getByRole("button", { name: /toggle theme/i }))

  await new Promise((r) => setTimeout(r, THEME_ANIM_DURATION * 1000))

  expect(
    rgbToHex(
      window.getComputedStyle(container.firstElementChild as HTMLElement)
        .backgroundColor
    ).toLowerCase()
  ).toMatch(darkBGColor)

  expect(
    rgbToHex(
      window.getComputedStyle(container.firstElementChild as HTMLElement).color
    ).toLowerCase()
  ).toMatch(darkTextColor)
})
