import React from "react"
import styled from "styled-components"

const LinkInput = () => {
  return (
    <Wrapper>
      <StyledInput
        type="text"
        name="Link Input"
        id="link-input"
        placeholder="enter a link..."
        autoFocus
      />
      <Button>Convert</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 4px;
  padding-left: 18px;
`
const StyledInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 100%;
  font-size: 16px;
  border-style: none;
  color: #4f5257;
  outline: none;
`
const Button = styled.div`
  width: 92px;
  height: 100%;
  background-color: #7db3ff;
  border-radius: 17px;
  font-size: 16px;
  font-weight: 900;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 0 16px;
`

export default LinkInput
