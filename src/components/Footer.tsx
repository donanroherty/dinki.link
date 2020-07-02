import React from "react"
import styled from "styled-components/macro"
import { Theme, getTheme } from "../theme/theme"
import { motion } from "framer-motion"

type Props = {
  theme: Theme
}
function Footer(props: Props) {
  const { theme } = props
  return (
    <StyledFooter>
      <div>
        <a href="http://ronandoherty.com">
          <em>ronandoherty.com</em>
        </a>
        <motion.div animate={{ color: getTheme(theme).textColor }}>
          © Ronan Doherty 2020
        </motion.div>
      </div>
    </StyledFooter>
  )
}

const StyledFooter = styled.div`
  height: 70px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    text-align: center;
    > * {
      padding: 6px;
    }
  }
`

export default Footer
