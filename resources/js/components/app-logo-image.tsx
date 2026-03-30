import { ImgHTMLAttributes } from "react";

export default function AppLogoImage(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/images/physics-logo.png" {...props} />
    )
}
