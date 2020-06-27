import React, { useState } from "react"
import styled from "styled-components"
import { useSpring, animated, config } from "react-spring"
import BusyIndicator from "./BusyIndicator"

const CONVERT_BUTTON_PERC_WIDTH = 30

const mapToRange = (
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  val: number
) => {
  const inRange = inMax - inMin
  const inAlpha = (val - inMin) / inRange
  const outRange = outMax - outMin
  return outMin + outRange * inAlpha
}

enum InputState {
  Initial,
  ExpandButton,
  ShowBusy,
}

const LinkInput = () => {
  const [inputState, setInputState] = useState(InputState.Initial)

  // Animate button
  const expandBtnLeftStart = `calc(${100 - CONVERT_BUTTON_PERC_WIDTH}%)`
  const expandBtnWidthStart = `${CONVERT_BUTTON_PERC_WIDTH}%`
  const expand = useSpring({
    from: {
      left: (() => expandBtnLeftStart)(),
      width: expandBtnWidthStart,
    },
    to: {
      left: (() =>
        inputState !== InputState.Initial ? `0` : expandBtnLeftStart)(),
      width: inputState !== InputState.Initial ? `100%` : expandBtnWidthStart,
    },
    config: { delay: 0, tension: 300, friction: 30, velocity: 10 },
    onRest: ({ width }) => {
      if (width === "100%") {
        setInputState(InputState.ShowBusy)
      }
    },
  })

  // Animate circle wipe
  const expandCircle = useSpring({
    from: { width: 0, height: 0 },
    to: {
      width: inputState === InputState.ShowBusy ? 300 : 0,
      height: inputState === InputState.ShowBusy ? 300 : 0,
    },
  })

  const handleButtonClick = () => {
    setInputState((curr) =>
      curr === InputState.Initial ? InputState.ExpandButton : InputState.Initial
    )
  }

  return (
    <Wrapper>
      <div>
        <StyledInput
          type="text"
          name="Link Input"
          id="link-input"
          placeholder="enter a link..."
          autoFocus
        />

        <Button style={expand} onClick={handleButtonClick}>
          {inputState !== InputState.ShowBusy && "Convert"}
        </Button>

        <CircleWrapper>
          <Circle style={expandCircle} />

          {inputState === InputState.ShowBusy && <BusyIndicator />}
        </CircleWrapper>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  min-height: 45px;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  padding: 4px;

  > div {
    position: relative;
    display: flex;
    justify-content: center;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

const Button = styled(animated.div)`
  position: absolute;
  left: calc(${100 - CONVERT_BUTTON_PERC_WIDTH}% - 4px);
  width: ${CONVERT_BUTTON_PERC_WIDTH}%;
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
  user-select: none;
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
const CircleWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`
const Circle = styled(animated.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`
export default LinkInput
