import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({
  content,
}: ArticleContentProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeSanitize]}
          components={{
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
              if (isBlock) {
                return (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                    {" "}
                    {children}{" "}
                  </code>
                );
              }
              return (
                <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm">
                  {" "}
                  {children}{" "}
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
