import React from "react"
import { render, fireEvent } from "@testing-library/react"
import App from "../App"
import { getTheme } from "../../theme/theme"

it("responds correctly to theme change", async () => {
  const { getByRole } = render(<App />)

  const themeBtn = getByRole("button", { name: /toggle theme/i })
  const githubBtn = getByRole("button", { name: /github repo/i })

  const lightTextColor = getTheme("light").textColor
  const darkTextColor = getTheme("dark").textColor

  expect(themeBtn.innerHTML.search(`fill="${lightTextColor}"`)).not.toBe(-1)
  expect(githubBtn.innerHTML.search(`fill="${lightTextColor}"`)).not.toBe(-1)

  fireEvent.click(themeBtn)

  expect(themeBtn.innerHTML.search(`fill="${darkTextColor}"`)).not.toBe(-1)
  expect(githubBtn.innerHTML.search(`fill="${darkTextColor}"`)).not.toBe(-1)
})
