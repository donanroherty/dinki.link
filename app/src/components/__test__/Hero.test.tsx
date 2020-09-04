import React from "react"
import { render, fireEvent } from "@testing-library/react"
import App, { THEME_ANIM_DURATION } from "../App"
import "jest-styled-components"

it("responds correctly to theme change", async () => {
  const { getByAltText, getByRole } = render(<App />)

  getByAltText("illustration-night")

  expect(
    window.getComputedStyle(getByAltText("illustration-day")).opacity
  ).toBe("1")

  fireEvent.click(getByRole("button", { name: /toggle theme/i }))
  await new Promise((r) => setTimeout(r, THEME_ANIM_DURATION * 1000))

  expect(
    window.getComputedStyle(getByAltText("illustration-day")).opacity
  ).toBe("0")
})
