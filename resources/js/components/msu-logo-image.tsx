import { cn } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

export default function MsuLogoImage(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/storage/msu-logo.png" {...props} className={cn([
            props.className,
            ""
        ])} />
    )
}
