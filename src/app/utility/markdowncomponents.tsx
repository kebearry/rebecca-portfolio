import type { ComponentProps } from "react";
import type { ExtraProps } from "react-markdown";
import { defaultUrlTransform } from "react-markdown";
import LinkRenderer from "./linkrenderer";
import MarkdownImage from "./markdownimage";

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

export const markdownComponents = {
  a: LinkRenderer,
  img: MarkdownImage,
  p: MarkdownParagraph,
};
