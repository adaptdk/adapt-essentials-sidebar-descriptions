import {
  Box,
  Flex,
  IconButton,
  SectionHeading,
  Textarea,
} from "@contentful/f36-components";
import { DeleteIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";

import type { TypeTextField } from "./types";

const TextField = ({
  value,
  id,
  itemId,
  onItemChange,
  onRemoveItem,
}: TypeTextField) => (
  <Box className={css({ width: `100%` })}>
    <SectionHeading className={css({ marginBottom: tokens.spacingXs })}>
      Text field
    </SectionHeading>

    <Flex fullWidth alignItems={`flex-start`} gap={tokens.spacingS}>
      <Textarea
        placeholder="Start filling out your description here"
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
  </Box>
);

export default TextField;
