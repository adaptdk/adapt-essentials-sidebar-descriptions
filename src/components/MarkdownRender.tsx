import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type TypeMarkdownRender = { value: string; isSidebar?: boolean };

const MarkdownRender = ({ value, isSidebar }: TypeMarkdownRender) => (
  <Markdown
    className={css({
      maxWidth: tokens.contentWidthText,
      display: `flex`,
      flexDirection: `column`,
      gap: isSidebar ? `0.5rem` : `1rem`,
    })}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]}
  >
    {value}
  </Markdown>
);

export default MarkdownRender;
