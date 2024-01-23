import {
  Box,
  Caption,
  Flex,
  IconButton,
  SectionHeading,
  TextInput,
} from "@contentful/f36-components";
import { DeleteIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";

import type { TypeImageField } from "./types";

const ImageField = ({
  isValidUrl,
  value,
  id,
  itemId,
  onItemChange,
  onRemoveItem,
}: TypeImageField) => (
  <Box className={css({ width: `100%` })}>
    <SectionHeading className={css({ marginBottom: tokens.spacingXs })}>
      Image field
    </SectionHeading>

    <Flex fullWidth alignItems={`flex-start`} gap={tokens.spacingS}>
      <TextInput
        type={`url`}
        placeholder={`Image URL`}
        isInvalid={!isValidUrl}
        value={value}
        onChange={(e) => onItemChange(itemId, e.target.value)}
      />
      <IconButton
        variant={`negative`}
        aria-label="Delete field"
        onClick={() => onRemoveItem(id, itemId)}
        icon={<DeleteIcon />}
      />
    </Flex>

    {!isValidUrl && (
      <Caption className={css({ color: tokens.red600 })}>
        Has to be a valid image URL
      </Caption>
    )}
  </Box>
);

export default ImageField;
