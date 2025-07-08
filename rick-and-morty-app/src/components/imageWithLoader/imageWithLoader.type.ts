import type { ImgHTMLAttributes } from "react"

export interface IImageWithLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
    loaderClassName?: string
    imageClassNames?: string
    wrapperClassNames?: string
}