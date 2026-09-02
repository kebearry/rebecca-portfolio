import type { ComponentProps } from "react";
import type { ExtraProps } from "react-markdown";
import { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import LinkRenderer from "./linkrenderer";
import MarkdownImage from "./markdownimage";
import {
  FlowPairs,
  FlowSteps,
  parseFlowPairs,
  parseFlowSteps,
  parseSystemContentMap,
  SystemContentMap,
} from "../ui/flowdiagram";

export const markdownRemarkPlugins = [remarkGfm];

export function caseStudyUrlTransform(url: string) {
  if (url.startsWith("protected:")) return url;
  return defaultUrlTransform(url);
}

type ParagraphProps = ComponentProps<"p"> & ExtraProps;

function MarkdownParagraph({ node, children, ...props }: ParagraphProps) {
  const isImageOnlyParagraph =
    node?.children?.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "img";

  if (isImageOnlyParagraph) {
    return <>{children}</>;
  }

  return <p {...props}>{children}</p>;
}

function MarkdownTable({ children, ...props }: ComponentProps<"table">) {
  return (
    <div className="markdown-table-wrapper">
      <table {...props}>{children}</table>
    </div>
  );
}

type CodeProps = ComponentProps<"code"> & ExtraProps;

function MarkdownPre({ children }: ComponentProps<"pre">) {
  return <>{children}</>;
}

function MarkdownCode({ className, children, ...props }: CodeProps) {
  const match = /language-([\w-]+)/.exec(className || "");
  const language = match?.[1];
  const content = String(children).replace(/\n$/, "");

  if (language === "flow") {
    return <FlowSteps steps={parseFlowSteps(content)} />;
  }

  if (language === "flow-pairs") {
    const { pairs, destination } = parseFlowPairs(content);
    return <FlowPairs pairs={pairs} destination={destination} />;
  }

  if (language === "flow-map") {
    return <SystemContentMap rows={parseSystemContentMap(content)} />;
  }

  if (language) {
    return (
      <pre className="markdown-code-block">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export const markdownComponents = {
  a: LinkRenderer,
  img: MarkdownImage,
  p: MarkdownParagraph,
  table: MarkdownTable,
  pre: MarkdownPre,
  code: MarkdownCode,
};
