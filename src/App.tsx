import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Sidebar from "./components/Sidebar";
import { type CreateSuggestionResponse, suggestionServices } from "@/services/suggestionServices.ts";
import { AxiosError } from "axios";
import { SuggestionTopics } from "@/components/suggestions/SuggestionTopics.tsx";
import { SuggestionList } from "@/components/suggestions/SuggestionList.tsx";

export function App() {
  const [prompt, setPrompt] = useState("");
  const [suggestionsResponse, setSuggestionsResponse] = useState<CreateSuggestionResponse>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      await handleSuggestionTopicSelect(prompt.trim());
    }
  };

  const handleSuggestionTopicSelect = async (topic: string) => {
    if (isLoading || !topic) return;
    try {
      setIsLoading(true);
      const response = await suggestionServices.create(topic);
      setPrompt("");
      setSuggestionsResponse(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.error);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Metadatos SEO dinámicos basados en el estado
  const pageTitle = suggestionsResponse
    ? `${suggestionsResponse.prompt} - Journal App`
    : "Journal App - Generador de ideas creativas";
  const pageDescription = suggestionsResponse
    ? `Ideas y sugerencias sobre: ${suggestionsResponse.prompt}`
    : "Genera ideas creativas para tus artículos y proyectos";

  return (
    <>
      {/* Metadatos SEO básicos sin dependencias */}
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="ideas, creatividad, escritura, journal, sugerencias" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary" />
      </head>

      <div className="flex h-screen bg-zinc-900 text-white">
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

        <div className="flex-1 flex flex-col">
          <header className="flex items-center p-4 border-b border-zinc-800"> {/* Cambiado a header */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-2 p-1 rounded-md hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              aria-label={isSidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
              aria-expanded={isSidebarOpen}
            >
              {isSidebarOpen ? "←" : "→"}
            </button>
            <h1 className="text-2xl font-medium">Journal App</h1>
          </header>

          <main className="flex-1 overflow-auto p-6 flex items-center justify-center"> {/* Cambiado a main */}
            <article className="max-w-2xl w-full text-center"> {/* Cambiado a article */}
              {isLoading ? (
                <div className="flex justify-center mb-4" role="status" aria-live="polite">
                  <p>Cargando sugerencias...</p>
                </div>
              ) : suggestionsResponse ? (
                <>
                  <SuggestionList suggestionsResponse={suggestionsResponse} />
                  {/* Schema Markup para SEO */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "CreativeWork",
                      "name": suggestionsResponse.prompt,
                      "description": `Sugerencias sobre ${suggestionsResponse.prompt}`,
                      "text": suggestionsResponse.suggestions.map(s => s.content).join(" ")
                    })}
                  </script>
                </>
              ) : (
                <SuggestionTopics
                  handleSuggestionTopicSelect={(topic) => handleSuggestionTopicSelect(topic)}
                />
              )}
            </article>
          </main>

          <footer className="p-4 border-t border-zinc-800"> {/* Cambiado a footer */}
            <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
              <label htmlFor="message-input" className="sr-only">
                Escribe tu mensaje
              </label>
              <Input
                id="message-input"
                disabled={isLoading}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe tu tema..."
                className="bg-zinc-800 border-zinc-700 pr-12 focus-visible:ring-green-500"
                aria-describedby="message-help"
              />
              <Button
                disabled={isLoading}
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 bg-green-500 hover:bg-green-600 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800"
                aria-label="Enviar mensaje"
              >
                <Send size={16} aria-hidden="true" />
              </Button>
              <span id="message-help" className="sr-only">
                Escribe tu tema y presiona Enter para generar sugerencias
              </span>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}