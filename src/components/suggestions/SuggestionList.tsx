import {type CreateSuggestionResponse} from "@/services/suggestionServices.ts";

function SuggestionList({suggestionsResponse}: { suggestionsResponse: CreateSuggestionResponse }) {
  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.29 7 12 12 20.71 7"/>
            <line x1="12" x2="12" y1="22" y2="12"/>
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-8">{suggestionsResponse.prompt}</h2>

      <div className="flex flex-col gap-8">
        {suggestionsResponse.suggestions.map((suggestion) => (
          <div key={suggestion.title} className="border border-zinc-700 rounded-lg p-4 text-left">
            <h2 className="font-bold text-lg mb-2">{suggestion.title}</h2>
            <p>{suggestion.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default SuggestionList


