import React from "react"
import icons from "../icons"

export type IconProps = {
  name: keyof typeof icons
  color?: string
  size?: string | number
}

export default function Icon(props: IconProps) {
  const { name: iconName, color = "red", size = "100%" } = props

  const iconJsx = icons[iconName](color)

  const Comp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return {
      ...iconJsx,
      props: {
        ...iconJsx.props,
        ...props,
      },
    }
  }

  return <Comp data-testid="icon" {...props} width={size} height={size} />
}
