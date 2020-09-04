import React from "react"
import styled from "styled-components"
import { animated, useSpring, config } from "react-spring"

const BusyIndicator = () => {
  const makeSpringConfig = (targetProp: string, dir: number) => {
    return {
      from: { [targetProp]: 0 },
      to: { [targetProp]: dir * 10 },
      config: {
        ...config.wobbly,
        tension: 50,
        friction: 0,
      },
    }
  }

  const springLeft = useSpring(makeSpringConfig("left", -1))
  const springRight = useSpring(makeSpringConfig("left", 1))

  return (
    <Wrapper>
      <Dot pos={0} style={springLeft}></Dot>
      <Dot pos={1}></Dot>
      <Dot pos={2} style={springRight}></Dot>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: false;
`
const Dot = styled(animated.div)<{ pos: number }>`
  position: relative;
  width: 6px;
  height: 6px;
  float: left;
  border-radius: 50%;
  background-color: #7db3ff;
`

export default BusyIndicator
