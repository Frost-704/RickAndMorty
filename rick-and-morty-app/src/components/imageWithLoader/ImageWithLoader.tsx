import { useState, type FC } from "react"
import type { IImageWithLoaderProps } from "./imageWithLoader.type"
import classNames from "classnames"

const ImageWithLoader: FC<IImageWithLoaderProps> = (
  {
    loaderClassName,
    imageClassNames,
    wrapperClassNames,
    ...rest
  }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className={`relative overflow-hidden ${wrapperClassNames}`}>
          {!isLoaded && (
          <div
            className={
              classNames(
                'flex items-center justify-center bg-gray-100 animate-pulse',
                loaderClassName
              )}
          >
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          )}
    
          <img
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          className={
            classNames(
              'w-full h-full object-cover transition-opacity duration-300',
              imageClassNames,
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            {...rest}
          />
        </div>
      )
}

export default ImageWithLoader