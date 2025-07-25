import { useState, useEffect } from 'react';

const useDebouncedValue = <T>(value: T, delay: number): T =>{
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setDebouncedValue(value)
    }, delay)

    return () => {
        clearTimeout(timeoutId)
    }
}, [value, delay])

    return debouncedValue
}

export default useDebouncedValue
