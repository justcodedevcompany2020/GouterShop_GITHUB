import { Svg, Circle, Rect } from "react-native-svg";


export const SelectedIcon = () => {
    return <Svg
        width={16}
        height={17}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Rect y={0.500366} width={16} height={16} rx={8} fill="#52BB85" />
        <Circle cx={8} cy={8.50037} r={4} fill="#fff" />
    </Svg>
}