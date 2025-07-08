import { useQuery } from "@tanstack/react-query"
import fetchCharacters from "../api/character/character"
import type { Character, Info } from "../types/interfaces"
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEventHandler } from "react"
import { DEBOUNCED_TIME, LOCALSTORAGE_KEYS, TIME_BEFORE_REFETCH } from "../config/constants"
import useDebouncedValue from "./useDebouncedValue"

const useApp = () => {
    const [name, setName] = useState(() => localStorage.getItem(LOCALSTORAGE_KEYS.name) || '')
    const [status, setStatus] = useState(() => localStorage.getItem(LOCALSTORAGE_KEYS.status) || '')

    const debouncedName = useDebouncedValue(name, DEBOUNCED_TIME)

    const filters = useMemo(() => ({ name: debouncedName, status }), [debouncedName, status]);

    const {
        data,
        isError,
        isSuccess,
        isFetching,
        refetch,
    } = useQuery<Info<Character[]>, Error, Info<Character[]>, [string, typeof filters]>({
        queryKey: ['characters', filters],
        queryFn: () => fetchCharacters(filters),
        staleTime: TIME_BEFORE_REFETCH,
        retry: false,
        placeholderData: (previousData) => previousData,
    })

    const lastSuccessfulData = useRef<Info<Character[]> | null>(null);

    useEffect(() => {
        if (isSuccess && data) {
            lastSuccessfulData.current = data;
        }
    }, [isSuccess, data]);

    const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        refetch()
    }

    const handleInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setName(value);
            localStorage.setItem(LOCALSTORAGE_KEYS.name, value);
        },
        [],
);

    const handleStatusChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            if (value === status) return;
            setStatus(value);
            localStorage.setItem(LOCALSTORAGE_KEYS.status, value);
        },
        [status],
    );

    return {
        methods: {
            handleSearch,
            setName,
            setStatus,
            handleInput,
            handleStatusChange
        },
        state: {
            isFetchCharactersPending: isFetching,
            isFetchCharactersError: isError,
            characterList: (data ?? lastSuccessfulData.current)?.results,
            name,
            status,
        },
    }
}

export default useApp