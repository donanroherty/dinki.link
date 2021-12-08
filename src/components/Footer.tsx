import React from "react"
import styled from "styled-components/macro"
import { motion } from "framer-motion"
import { Theme } from "../theme/theme"

type Props = {
  theme: Theme
}
function Footer(props: Props) {
  return (
    <StyledFooter linkColor={props.theme.brandColor}>
      <div>
        <a href="http://ronandoherty.com" target="_blank" rel="noopener noreferrer">
          <em>ronandoherty.com</em>
        </a>
        <motion.div>© Ronan Doherty 2020</motion.div>
      </div>
    </StyledFooter>
  )
}

const StyledFooter = styled.div<{ linkColor: string }>`
  height: 70px;
  font-size: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  a:link {
    color: ${({ linkColor }) => linkColor};
  }
  a:visited {
    color: ${({ linkColor }) => linkColor};
  }
  a:hover {
    color: ${({ linkColor }) => linkColor};
  }
  a:active {
    color: ${({ linkColor }) => linkColor};
  }

  > div {
    text-align: center;
    > * {
      padding: 6px;
    }
  }
`

export default Footer
