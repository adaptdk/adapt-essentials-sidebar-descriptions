import { Button, Paragraph, Stack, Textarea } from "@contentful/f36-components";
import React from "react";

import type { TypeDescriptionItem } from "../utils/types";

type Props = {
  items: Array<TypeDescriptionItem>;
  onItemChange: (itemId: string, newValue: string) => void;
  onAddItem: () => void;
};

const DescriptionEditor = ({ items, onItemChange, onAddItem }: Props) => (
  <Stack alignItems={`flex-start`} flexDirection={`column`}>
    <Paragraph>
      To create different elements, like an image, press the button below.
    </Paragraph>
    {items?.at(0) &&
      items.map(({ id, type, value }) => {
        switch (type) {
          case `text`:
            return (
              <Textarea
                key={id}
                placeholder="Start filling out your description here"
                value={value}
                onChange={(e) => onItemChange(id, e.target.value)}
              />
            );
          default:
            return null;
        }
      })}
    <Button onClick={onAddItem}>Add Item</Button>
  </Stack>
);

export default DescriptionEditor;
