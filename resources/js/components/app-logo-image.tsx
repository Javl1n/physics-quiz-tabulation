import { ImgHTMLAttributes } from "react";

export default function AppLogoImage(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/storage/physics-logo.png" {...props} />
    )
}
