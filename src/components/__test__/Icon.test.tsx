import React from "react"
import { render } from "@testing-library/react"
import Icon from "../Icon"

describe("<Icon/>", () => {
  it("matches snapshot", () => {
    const { container } = render(<Icon name="daynight" color="red" size={5} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  it("adds and icon to the document", () => {
    const { getByTestId } = render(<Icon name="github" />)
    expect(getByTestId(/icon/i)).not.toBeUndefined()
  })

  it("renders correct fill color", () => {
    const { getByTestId } = render(<Icon name="github" color="green" />)
    const svg = getByTestId(/icon/i)
    expect(svg.children[0].getAttribute("fill")).toBe("green")
  })

  it("renders correct size", () => {
    const { getByTestId } = render(<Icon name="github" size={20} />)

    const svg = getByTestId(/icon/i)
    expect(svg.getAttribute("width")).toBe("20")
    expect(svg.getAttribute("height")).toBe("20")
  })
})
