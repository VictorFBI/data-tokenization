import {Token} from '@/src/types/Token';
import {FilterParams} from '@/src/types/FilterParams';
import {MOCK_TOKENS} from "@/src/constants/mock-values";

const API_URL = 'https://your-api-url.com';

export const fetchTokens = async (params: FilterParams): Promise<Token[]> => {
    // try {
    //     const response = await fetch(`${API_URL}/tokens`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(params),
    //     });
    //     return await response.json();
    // } catch (error) {
    //     console.error('Error fetching tokens:', error);
    //     return [];
    // }

    // Mock response for demonstration purposes
    return MOCK_TOKENS
};

export const addToken = async (tokenData: Partial<Token>): Promise<Token> => {
    // try {
    //     const response = await fetch(`${API_URL}/tokens/add`, {
    //         method: 'POST',
    //         body: JSON.stringify(tokenData),
    //     });
    //     return await response.json();
    // } catch (error) {
    //     console.error('Error adding token:', error);
    //     throw error;
    // }

    // Mock response for demonstration purposes
    return MOCK_TOKENS[0];
};