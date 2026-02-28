import ReactMarkdown from "react-markdown";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
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
  writer_name?: string;
  writer_id?: string | number;
  writer_icon?: string;
}

export function ArticleContent({
  content,
  className = "bg-white rounded-lg shadow-md p-8",
  writer_name,
  writer_id,
  writer_icon
}: ArticleContentProps) {
  return (
    <div className={className}>
      <div className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [
              rehypeSanitize,
              {
                ...defaultSchema,
                tagNames: [...(defaultSchema.tagNames || []), "video", "iframe", "span"],
                attributes: {
                  ...defaultSchema.attributes,
                  video: ["src", "controls", "width", "height", "autoPlay", "autoplay", "loop", "muted", "poster"],
                  iframe: ["src", "width", "height", "title", "frameBorder", "frameborder", "allow", "allowFullScreen", "allowfullscreen", "className"],
                  span: ["className"]
                }
              }
            ]
          ]}
          components={{
            // Tables
            table: ({ children }) => (
              <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full border-collapse text-sm text-left">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50 border-b border-gray-200">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="bg-white divide-y divide-gray-200">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-gray-50/50 transition-colors">
                {children}
              </tr>
            ),
            th: ({ children, style }) => (
              <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap" style={{ textAlign: style?.textAlign || 'left' }}>
                {children}
              </th>
            ),
            td: ({ children, style }) => (
              <td className="px-6 py-4 text-gray-700" style={{ textAlign: style?.textAlign || 'left' }}>
                {children}
              </td>
            ),
            // Headers
            h1: ({ children }) => (
              <h1 className="text-4xl md:text-5xl mt-12 mb-8 font-black tracking-tight text-gray-900 border-b pb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl mt-12 mb-6 font-bold tracking-tight text-gray-900 border-b-2 border-emerald-100 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl mt-10 mb-4 font-bold text-gray-800 flex items-center gap-2 before:content-[''] before:block before:w-1.5 before:h-6 before:bg-emerald-500 before:rounded-full">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-xl mt-8 mb-4 font-bold text-gray-800">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-lg mt-6 mb-4 font-bold text-gray-800">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-base mt-6 mb-4 font-bold text-gray-500 uppercase tracking-widest">
                {children}
              </h6>
            ),
            // Text & Links
            p: ({ children }) => (
              <p className="mb-6 text-gray-700 leading-loose text-lg">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-emerald-600 hover:text-emerald-700 font-bold underline decoration-emerald-200 hover:decoration-emerald-500 underline-offset-4 transition-all" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            // Lists
            ul: ({ children }) => (
              <ul className="list-disc list-outside mb-6 ml-6 space-y-2 text-gray-700 text-lg leading-loose marker:text-emerald-500">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-outside mb-6 ml-6 space-y-2 text-gray-700 text-lg leading-loose marker:text-emerald-600 marker:font-bold">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="pl-2">
                {children}
              </li>
            ),
            // Blockquote & HR
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-emerald-400 bg-emerald-50/50 text-gray-700 italic px-6 py-4 rounded-r-2xl mb-8 shadow-sm">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="my-12 border-gray-200" />,
            // Media
            img: ({ src, alt, title }) => (
              <span className="block my-10 text-center">
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className="rounded-2xl shadow-lg mx-auto max-w-full border border-gray-100 block"
                  loading="lazy"
                />
                {title && <span className="block text-sm text-gray-500 mt-3 font-medium">{title}</span>}
              </span>
            ),
            video: (props: any) => (
              <span className="block my-10">
                <video
                  src={props.src}
                  controls={props.controls != null}
                  autoPlay={props.autoplay != null || props.autoPlay != null}
                  loop={props.loop != null}
                  muted={props.muted != null}
                  poster={props.poster}
                  className="rounded-2xl shadow-lg w-full border border-gray-100 bg-gray-900 block"
                />
              </span>
            ),
            iframe: (props: any) => (
              <span className="block my-10 relative w-full aspect-video rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <iframe
                  src={props.src}
                  title={props.title}
                  allow={props.allow}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  frameBorder="0"
                />
              </span>
            ),
            // Code blocks
            pre: ({ children }) => {
              const codeProps = (children as any)?.props;
              const className = codeProps?.className || "";
              const match = /language-(\w+)/.exec(className);
              const language = match ? match[1] : "";

              if (language === "mermaid") {
                return <>{children}</>;
              }

              return (
                <div className="relative group mb-8 rounded-2xl shadow-lg border border-gray-800 bg-[#1e1e1e] overflow-hidden">
                  {language && (
                    <div className="flex justify-between items-center px-4 py-2.5 bg-gray-800/80 border-b border-gray-700/50">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-pointer"></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest select-none">{language}</span>
                    </div>
                  )}
                  <div className="overflow-x-auto">
                    <pre className={`p-6 ${!language ? 'pt-6' : 'pt-4'} min-w-full inline-block`}>
                      {children}
                    </pre>
                  </div>
                </div>
              );
            },
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || "");
              const isBlock = match != null;
              const language = match ? match[1] : "";

              if (language === "mermaid") {
                return <Mermaid content={String(children).replace(/\n$/, "")} />;
              }

              if (isBlock) {
                return (
                  <code className="font-mono text-[14px] leading-[1.7] text-gray-100 selection:bg-emerald-500/30">
                    {children}
                  </code>
                );
              }
              // Inline code
              // return (
              //   <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
              //     {children}
              //   </code>
              // );
              // (old style for reference, not used)
              return (
                <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 mx-0.5 rounded-md text-[0.9em] font-mono border border-emerald-100">
                  {children}
                </code>
              );
            },
            // Emphases
            strong: ({ children }) => <strong className="font-black text-gray-900">{children}</strong>,
            em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
            del: ({ children }) => <del className="line-through text-gray-400 decoration-red-500">{children}</del>,
          }}
        >
          {content}
        </ReactMarkdown>

        {(writer_name || writer_icon) && (
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-end">
            <a
              href={writer_id ? `/creator?cid=${writer_id}` : undefined}
              className="group flex items-center gap-4 hover:bg-gray-50 p-2 rounded-2xl transition-all"
            >
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Written by</p>
                <p className="text-sm font-black text-gray-700 group-hover:text-emerald-500 transition-colors">{writer_name}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md group-hover:shadow-lg transition-all group-hover:-translate-y-0.5">
                {writer_icon ? (
                  <img src={writer_icon} alt={writer_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <span className="text-lg font-black">{writer_name?.charAt(0)}</span>
                  </div>
                )}
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
