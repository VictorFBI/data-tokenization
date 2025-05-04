import {useCallback, useEffect, useState} from 'react';
import {Token} from '@/src/types/Token';
import {FilterParams} from '@/src/types/FilterParams';
import {fetchTokens, addToken} from '@/src/services/tokenService';

export const useTokens = (initialParams: FilterParams = {}) => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [filterParams, setFilterParams] = useState<FilterParams>(initialParams);
    const [isLoading, setIsLoading] = useState(false);

    const loadTokens = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchTokens(filterParams);
            setTokens(data);
        } finally {
            setIsLoading(false);
        }
    }, [filterParams]);

    const handleAddToken = useCallback(async (newTokenData: Partial<Token>) => {
        try {
            await addToken(newTokenData);
            await loadTokens();
        } catch (error) {
            console.error('Error adding token:', error);
        }
    }, [loadTokens]);

    useEffect(() => {
        loadTokens();
    }, [loadTokens]);

    return {
        tokens,
        isLoading,
        filterParams,
        setFilterParams,
        handleAddToken,
        refreshTokens: loadTokens,
    };
};