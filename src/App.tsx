import {useState} from "react"
import {Send} from "lucide-react";

import {Button} from "./components/ui/button"
import {Input} from "./components/ui/input";
import Sidebar from "./components/Sidebar"
import {type CreateSuggestionResponse, suggestionServices} from "@/services/suggestionServices.ts";
import {AxiosError} from "axios";
import {SuggestionTopics} from "@/components/suggestions/SuggestionTopics.tsx";
import {SuggestionList} from "@/components/suggestions/SuggestionList.tsx";

export function App() {
  const [prompt, setPrompt] = useState("")
  const [suggestionsResponse, setSuggestionsResponse] = useState<CreateSuggestionResponse>()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      await handleSuggestionTopicSelect(prompt.trim())
    }
  }

  const handleSuggestionTopicSelect = async (topic: string) => {
    if (isLoading || !topic) return
    try {
      setIsLoading(true)
      const response = await suggestionServices.create(topic)
      console.log(response)
      setPrompt("")
      setSuggestionsResponse(response)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('hola', error.response?.data?.error);
        alert(error.response?.data?.error);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)}/>}

      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-4 border-b border-zinc-800">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2 p-1 rounded-md hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
          <h1 className="text-2xl font-medium">Journal App</h1>
        </div>

        <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="max-w-2xl w-full text-center">
            {
              isLoading ?
                <div className="flex justify-center mb-4">
                  <p>Loading...</p>
                </div>

                :
                suggestionsResponse ?
                  <SuggestionList suggestionsResponse={suggestionsResponse}/>
                  :
                  <SuggestionTopics
                    handleSuggestionTopicSelect={(topic) => handleSuggestionTopicSelect(topic)}
                  />
            }
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <Input
              disabled={isLoading}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Message..."
              className="bg-zinc-800 border-zinc-700 pr-12 focus-visible:ring-green-500"
              aria-describedby="message-help"
            />
            <Button
              disabled={isLoading}
              type="submit"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 bg-green-500 hover:bg-green-600 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800"
              aria-label="Send message"
            >
              <Send size={16}/>
            </Button>
            <span id="message-help" className="sr-only">
              Type your message and press enter to send
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}
