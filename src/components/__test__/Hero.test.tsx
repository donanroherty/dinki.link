import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Hero from "../Hero"
import App from "../App"
import "jest-styled-components"

it("alters bottom padding on scroll", () => {
  const { getByTestId } = render(<Hero />)

  expect(getByTestId("hero")).toHaveStyleRule("padding-bottom", "40px")
  fireEvent.scroll(window, { target: { scrollY: window.innerHeight } })
  expect(getByTestId("hero")).toHaveStyleRule("padding-bottom", "0px")
})
