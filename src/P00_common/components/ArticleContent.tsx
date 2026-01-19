import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";

interface MermaidProps {
  content: string;
}

const Mermaid: React.FC<MermaidProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
    if (ref.current) {
      // Clear previous content
      ref.current.innerHTML = content;
      mermaid.contentLoaded();
    }
  }, [content]);

  return <div className="mermaid flex justify-center my-8 overflow-x-auto" ref={ref}>{content}</div>;
};

interface ArticleContentProps {
  content: string;
  className?: string;
}

export function ArticleContent({
  content,
  className = "bg-white rounded-lg shadow-md p-8",
}: ArticleContentProps) {
  return (
    <div className={className}>
      <div className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            table: ({ children }) => (
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="border border-gray-200 px-4 py-2 font-bold text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-200 px-4 py-2 text-gray-700">
                {children}
              </td>
            ),
            h1: ({ children }) => (
              <h1 className="text-5xl mb-8 font-bold">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl mt-10 mb-6 font-semibold">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl mt-8 mb-4 font-semibold">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-gray-700 leading-7">
                {children}
              </p>
            ),

            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="rounded-xl shadow-md my-6 max-w-full"
                loading="lazy"
              />
            ),

            video: ({ src }) => (
              <video
                src={src}
                controls
                className="my-8 rounded-xl shadow-md w-full"
              />
            ),

            iframe: ({ src }) => (
              <iframe
                src={src}
                className="w-full aspect-video my-8 rounded-lg"
                allowFullScreen
              />
            ),

            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),

            code: ({ className, children }) => {
              const isBlock = className?.includes("language-");
              const language = className?.replace("language-", "");

              if (language === "mermaid") {
                return <Mermaid content={String(children).replace(/\n$/, "")} />;
              }

              if (isBlock) {
                return (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm leading-relaxed">
                    {children}
                  </code>
                );
              }
              return (
                <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
