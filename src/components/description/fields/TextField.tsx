import {
  Box,
  Flex,
  IconButton,
  SectionHeading,
  Textarea,
} from "@contentful/f36-components";
import { DeleteIcon, PreviewIcon, PreviewOffIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React, { useState } from "react";

import MarkdownRender from "../../MarkdownRender";
import type { TypeTextField } from "./types";

const TextField = ({
  value,
  id,
  itemId,
  onItemChange,
  onRemoveItem,
}: TypeTextField) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <Box className={css({ width: `100%` })}>
      <Flex
        alignItems={`flex-end`}
        justifyContent={`space-between`}
        gap={`spacingM`}
        paddingRight={`spacing2Xl`}
      >
        <SectionHeading className={css({ marginBottom: tokens.spacingXs })}>
          Text field
        </SectionHeading>
        <IconButton
          variant={`transparent`}
          icon={isPreview ? <PreviewOffIcon /> : <PreviewIcon />}
          aria-label={isPreview ? `Turn off preview` : `Preview`}
          onClick={() => setIsPreview(!isPreview)}
          size={`small`}
        >
          {isPreview ? `Edit` : `Preview`} text
        </IconButton>
      </Flex>

      {!isPreview ? (
        <Flex fullWidth alignItems={`flex-start`} gap={tokens.spacingS}>
          <Textarea
            placeholder="This field supports Markdown"
            value={value}
            onChange={(e) => onItemChange(itemId, e.target.value)}
            rows={5}
          />
          <IconButton
            variant={`negative`}
            aria-label="Delete field"
            onClick={() => onRemoveItem(id, itemId)}
            icon={<DeleteIcon />}
          />
        </Flex>
      ) : (
        <MarkdownRender value={value} />
      )}
    </Box>
  );
};

export default TextField;
