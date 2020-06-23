import icons from "../icons"

type Props = {
  iconName: keyof typeof icons
  color?: string
  size?: string | number
}

export default function Icon(props: Props) {
  const { iconName, color = "red", size = "100%" } = props

  const jsxBase = icons[iconName](color)
  const jsxUpdated = {
    ...jsxBase,
    props: { ...jsxBase.props, height: size, width: size },
  }

  return jsxUpdated
}
