import React, { useState, useRef } from "react"
import styled from "styled-components"
import {
  useSpring,
  animated,
  interpolate,
  OpaqueInterpolation,
} from "react-spring"
import * as easings from "d3-ease"

const LinkInput = () => {
  const [hasLink, setHasLink] = useState(false)

  const { x } = useSpring({
    from: { x: 0 },
    x: hasLink ? 1 : 0,
    config: { duration: 800, easing: easings.easeQuadInOut },
  })

  return (
    <Wrapper>
      <StyledInput
        type="text"
        name="Link Input"
        id="link-input"
        placeholder="enter a link..."
        autoFocus
      />

      <Button
        style={{
          left: x
            // .interpolate({ range: [0, 1], output: [70, 0] })
            .interpolate(
              (x) => `calc(${x * 70 * -1 + 70}% - ${x * (4 * -1) + 4 * x}px)`
            ),
        }}
        onClick={() => setHasLink(!hasLink)}
      >
        Convert
      </Button>
    </Wrapper>
  )
}

const Button = styled(animated.div)`
  position: absolute;
  width: 30%;
  height: 45px;
  background-color: #7db3ff;
  border-radius: 17px;
  font-size: 16px;
  font-weight: 900;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 45px;
  min-height: 45px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 4px;
`
const StyledInput = styled.input`
  min-width: 0;
  height: 100%;
  font-size: 16px;
  border-style: none;
  color: #4f5257;
  background-color: transparent;
  outline: none;
  margin-left: 18px;
`
export default LinkInput
