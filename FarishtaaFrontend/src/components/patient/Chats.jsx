import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const Chats = () => {
  const { chatHistory } = useSelector((state) => state.patient);
  const bottomRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="w-full h-[80vh] bg-[#f9fafb] overflow-y-auto px-4 py-6 rounded-xl">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {chatHistory?.map((msg, index) => {
          const isPatient = msg.role?.toLowerCase() === "patient";

          const content =
            typeof msg.content === "string"
              ? msg.content
              : JSON.stringify(msg.content);

          return (
            <div
              key={msg._id || index}
              className={`flex ${isPatient ? "justify-end" : "justify-start"}`}
            >
              <div className="flex gap-3 max-w-[85%]">
                
                {/* Avatar */}
                {!isPatient && (
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                    AI
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${
                    isPatient
                      ? "bg-red-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc ml-5 mb-2">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>

                {/* Patient Avatar */}
                {isPatient && (
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-sm font-semibold text-red-600">
                    You
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Chats;