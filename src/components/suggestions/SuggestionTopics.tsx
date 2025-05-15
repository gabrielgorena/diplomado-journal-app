
import SuggestionTopiCard from "@/components/suggestions/SuggestionTopiCard.tsx";


export function SuggestionTopics({handleSuggestionTopicSelect}: { handleSuggestionTopicSelect: (topic: string) => void }) {
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
      <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
      <p className="text-zinc-400 text-sm mb-8">
        I'm here to answer questions, help you with tasks, and
        <br/>
        turn ideas into practical solutions. What would you like to do?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SuggestionTopiCard
          onClick={() => handleSuggestionTopicSelect("Finance")}
          title="Finace"
          description="I can help you find content ideas based on finance"
        />
        <SuggestionTopiCard
          onClick={() => handleSuggestionTopicSelect("Sports")}
          title="Sports"
          description="I can help you find content ideas based on sports"
        />
        <SuggestionTopiCard
          onClick={() => handleSuggestionTopicSelect("Health")}
          title="Health"
          description="I can help you find content ideas based on health"
        />
      </div>
    </>
  )
}

