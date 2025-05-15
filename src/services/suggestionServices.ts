import {api} from "@/config/api.ts";

interface Suggestion {
  title: string,
  content: string
}

export interface CreateSuggestionResponse {
  suggestions: Suggestion[],
  prompt: string
}
export const suggestionServices = {
  create: async (prompt: string): Promise<CreateSuggestionResponse> => {
    const response = await api.post('/suggestions', {prompt})
    return response.data
  }
}