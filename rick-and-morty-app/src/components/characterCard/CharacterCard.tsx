import type { FC } from "react"
import type { Character } from "../../types/interfaces"
import type { JSX } from "react/jsx-runtime"
import ImageWithLoader from "../imageWithLoader/ImageWithLoader"

const CharacterCard: FC<{ characterInfo: Character }> = ({ characterInfo, ...rest }): JSX.Element => {
    const details: Array<[string, string | number | undefined]> = [
        ['Status', characterInfo.status],
        ['Type', characterInfo.type],
        ['Species', characterInfo.species],
        ['Origin', characterInfo.origin?.name],
        ['Gender', characterInfo.gender],
        ['Location', characterInfo.location?.name],
        ['Number of episodes', characterInfo.episode?.length],
    ];
    
    return (
        <article className="group flex flex-col items-center gap-2" {...rest}>
            <ImageWithLoader
                wrapperClassNames="group-hover:opacity-75 group-hover:rounded-4xl transition-[border-radius,opacity] duration-300 aspect-[1/1] max-w-fit w-full"
                loaderClassName="w-full aspect-[1/1] h-full min-h-[275px]"
                alt={`${characterInfo?.name} - photo`}
                src={characterInfo?.image}
            />
            <h3
                className="group-hover:opacity-75 transition-[opacity] py-2 bg-blue-500 text-white w-full font-bold text-center">
                {`${characterInfo?.name ?? 'secret'}`}
            </h3>
            <ul className="transition-[border-radius] flex flex-col text-left self-start w-full gap-2 p-2">
            {details
                .filter(([, value]) => value ?? false)
                .map(([label, value]) => (
                    <li key={label}>{`${label}: ${value}`}</li>
                ))}
            </ul>
        </article>
    )

}

export default CharacterCard