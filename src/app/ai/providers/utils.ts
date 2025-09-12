import { commonai } from 'automation-pieces-test';
const { SUPPORTED_AI_PROVIDERS } = commonai

export function getProviderConfig(provider: string): commonai.SupportedAIProvider | undefined {
    return SUPPORTED_AI_PROVIDERS.find((p) => p.provider === provider)
}

export function calculateTokensCost(
    tokens: number,
    costPerMillionTokens: number,
): number {
    return (tokens / 1000000) * costPerMillionTokens
}

export function calculateWebSearchCost(
    webSearchCalls: number,
    costPerWebSearch: number,
): number {
    return webSearchCalls * costPerWebSearch
}
