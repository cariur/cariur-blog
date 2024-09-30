"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Prism from "prismjs";
import "../app/prism-one-dark.css";
import "prismjs/components/prism-javascript";
import sanitize, { defaults } from "sanitize-html";
import { GetPostResult } from "@/lib/wisp";
import Image from "next/image";

export const PostContent = ({ content }: { content: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll("pre").forEach((block) => {
        const codeElement = block.querySelector("code");
        if (codeElement) {
          codeElement.className = "language-javascript";
          Prism.highlightElement(codeElement);

          // Create a copy button for each code block
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy";
          copyButton.className =
            "copy-button absolute top-2 right-2 bg-blue-500 text-white rounded px-2 py-1 text-sm";
          copyButton.onclick = () => {
            navigator.clipboard
              .writeText(codeElement.textContent || "")
              .then(() => {
                copyButton.textContent = "Copied!";
                setTimeout(() => {
                  copyButton.textContent = "Copy";
                }, 2000);
              });
          };

          // Make the pre element position relative
          block.style.position = "relative";

          // Insert the copy button at the beginning of the pre block
          block.insertBefore(copyButton, block.firstChild);
        }
      });
    }
  }, [content]);

  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "code",
      "pre",
      "p",
      "li",
      "ul",
      "ol",
      "blockquote",
      "td",
      "th",
      "table",
      "tr",
      "tbody",
      "thead",
      "tfoot",
      "small",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style", "align"],
      iframe: ["src", "allowfullscreen", "style"],
      a: ["href", "target"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });

  return (
    <div
      ref={contentRef}
      className="blog-content mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export const BlogPostContent = ({ post }: { post: GetPostResult["post"] }) => {
  if (!post) return null;
  const { title, publishedAt, createdAt, content, tags, author } = post;

  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1>{title}</h1>
        <div className="flex items-center mb-4">
          {author.image && (
            <Image
              alt="author"
              width={100}
              height={100}
              src="https://lh3.googleusercontent.com/a/ACg8ocJe8AGnYjZ8ZPI05ou5dIlerUi35_KLuGdvHiMQ7wsmZGZI7p0G=s96-c"
              className="w-10 h-10 rounded-full mr-2"
            />
          )}
          <span>{author.name}</span>
        </div>
        <PostContent content={content} />
        {tags && tags.length > 0 && (
          <div className="mt-10 opacity-40 text-sm">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.name}`}
                className="text-primary mr-2"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
        <div className="text-sm opacity-40 mt-4">
          {Intl.DateTimeFormat("en-US").format(
            new Date(publishedAt || createdAt)
          )}
        </div>
      </div>
    </div>
  );
};
