import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const MarkdownRender = ({ value }: { value: string }) => (
  <Markdown
    className={css({ maxWidth: tokens.contentWidthText })}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]}
  >
    {value}
  </Markdown>
);

export default MarkdownRender;
