
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Pick your theme

import type { Message } from "../Types/types"; // If you keep types in a separate file
 // If you keep types in a separate file

interface Props {
  message: Message;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md space-y-2 lg:max-w-lg rounded-lg p-4 ${
          isUser
            ? "font-medium text-gray-800 bg-gray-200"
            : "text-gray-800 font-medium text-lg"
        }`}
      >
        {isUser ? (
          <div className="text-sm whitespace-pre-wrap">{message.text}</div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-bold text-blue-600 mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-semibold text-blue-500 mb-1" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-6 space-y-1" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal ml-6 space-y-1" {...props} />
              ),
              // code: ({ node, inline, className, children, ...props }) =>
              //   !inline ? (
              //     <pre className="bg-gray-900 text-gray-100 p-3 rounded-xl overflow-x-auto">
              //       <code className={className} {...props}>
              //         {children}
              //       </code>
              //     </pre>
              //   ) : (
              //     <code className="bg-gray-200 text-red-600 px-1 rounded" {...props}>
              //       {children}
              //     </code>
              //   ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}

        {/* Timestamp */}
        <div
          className={`text-xs mt-5 ${
            isUser ? "text-blue-200" : "text-gray-500"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
