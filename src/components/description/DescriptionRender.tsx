import { Flex } from "@contentful/f36-components";
import { Image } from "@contentful/f36-image";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";

import { TypeDescriptionItem } from "../../utils/types";
import MarkdownRender from "../MarkdownRender";

type TypeDescriptionRender = {
  items: TypeDescriptionItem[];
  isSidebar?: boolean;
};

const DescriptionRender = ({ items, isSidebar }: TypeDescriptionRender) => (
  <Flex flexDirection={`column`}>
    {items.map((item) => {
      if (item.type === `text`) {
        return (
          <MarkdownRender
            key={item.id}
            value={item.value}
            isSidebar={isSidebar}
          />
        );
      }

      if (item.type === `image`) {
        return (
          <Image
            key={item.id}
            src={item.value}
            alt={``}
            width={isSidebar ? `100%` : `auto`}
            height={isSidebar ? `auto` : `100%`}
            className={css({
              marginTop: tokens.spacingS,
              marginBottom: tokens.spacingS,
              maxWidth: `1240px`,
            })}
          />
        );
      }
    })}
  </Flex>
);

export default DescriptionRender;
