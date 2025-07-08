import type { Character, CharacterFilter, Info } from "../../types/interfaces"
import { RICK_AND_MORTY_API_URL } from "../constants"

const fetchCharacters = async (params?: CharacterFilter): Promise<Info<Character[]>> => {
    const { name, status } = params ?? {};
    const url = new URL('api/character', RICK_AND_MORTY_API_URL);

    if (name?.trim()) url.searchParams.set('name', name.trim().toLowerCase());
    if (status) url.searchParams.set('status', status);


    const response = await fetch(url.toString())

    if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result
}

export default fetchCharacters