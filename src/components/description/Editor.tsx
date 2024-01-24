import { Flex, IconButton } from "@contentful/f36-components";
import { AssetIcon, DeleteIcon, TextIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import React, { useState } from "react";

import { URL_REGEX } from "../../utils/constants";
import type { TypeContentType, TypeDescriptionItem } from "../../utils/types";
import DeleteModal from "./DeleteModal";
import { ImageField, TextField } from "./fields";
import InformationSection from "./InformationSection";

type TypeEditor = {
  id: string;
  items: Array<TypeDescriptionItem>;
  contentType: TypeContentType;
  handleRemove: (descriptionId: string) => void;
  onItemChange: (itemId: string, newValue: string) => void;
  onAddItem: (descriptionId: string, type: `text` | `image`) => void;
  onRemoveItem: (descriptionId: string, itemId: string) => void;
};

const Editor = ({
  id,
  items,
  contentType,
  handleRemove,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: TypeEditor) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Flex
      alignItems={`flex-start`}
      flexDirection={`column`}
      gap={tokens.spacingM}
    >
      <InformationSection id={id} />

      {items?.at(0) &&
        items.map(({ id: itemId, type, value }) => {
          const isValidUrl = URL_REGEX.test(value);

          switch (type) {
            case `text`:
              return (
                <TextField
                  key={itemId}
                  value={value}
                  id={id}
                  itemId={itemId}
                  onItemChange={onItemChange}
                  onRemoveItem={onRemoveItem}
                />
              );

            case `image`:
              return (
                <ImageField
                  key={itemId}
                  isValidUrl={isValidUrl}
                  value={value}
                  id={id}
                  itemId={itemId}
                  onItemChange={onItemChange}
                  onRemoveItem={onRemoveItem}
                />
              );

            default:
              return null;
          }
        })}

      <Flex gap={tokens.spacingM}>
        <IconButton
          aria-label={`Add Text field`}
          icon={<TextIcon />}
          variant={`positive`}
          onClick={() => onAddItem(id, `text`)}
        >
          Add Text field
        </IconButton>
        <IconButton
          aria-label={`Add Image field`}
          icon={<AssetIcon />}
          variant={`positive`}
          onClick={() => onAddItem(id, `image`)}
        >
          Add Image field
        </IconButton>
        <IconButton
          aria-label={`Delete description`}
          variant={`negative`}
          icon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete description
        </IconButton>
      </Flex>

      <DeleteModal
        setOpen={setOpen}
        isOpen={isOpen}
        contentType={contentType}
        handleRemove={handleRemove}
        id={id}
      />
    </Flex>
  );
};

export default Editor;
