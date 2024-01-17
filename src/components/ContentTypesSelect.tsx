import {
  Autocomplete,
  Button,
  List,
  ListItem,
  Paragraph,
  Stack,
} from "@contentful/f36-components";
import React from "react";
import { useState } from "react";

import { TypeContentType } from "../utils/types";

type Props = {
  contentTypes: Array<TypeContentType>;
  handleAddDescription: (contentType: TypeContentType) => void;
  closeModal: () => void;
};

const emptyContentType = {
  name: ``,
  id: ``,
  description: ``,
  sys: {
    createdAt: ``,
  },
};

const ContentTypesSelect = ({
  contentTypes,
  handleAddDescription,
  closeModal,
}: Props) => {
  const [selectedType, setSelectedType] =
    useState<TypeContentType>(emptyContentType);
  const [filteredItems, setFilteredItems] = useState(contentTypes);
  const [inputValue, setInputValue] = useState(``);

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
    const newFilteredItems = contentTypes.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredItems(newFilteredItems);
  };

  const handleSelectItem = (item: TypeContentType) => {
    console.log(`item: `, item);
    setSelectedType(item);
  };

  const renderItem = (item: TypeContentType) => item.name;

  console.log(selectedType);

  const handleClick = () => {
    handleAddDescription(selectedType);
    closeModal();
  };

  return (
    <Stack flexDirection={`column`} alignItems={`flex-start`}>
      <Paragraph>
        Select a content type for which you want to create an advanced
        description.
      </Paragraph>
      <Autocomplete
        items={filteredItems}
        onInputValueChange={handleInputValueChange}
        onSelectItem={handleSelectItem}
        itemToString={(item) => item.name}
        renderItem={renderItem}
        inputValue={inputValue}
      />
      <Paragraph>
        Below you can confirm the selected content type&apos;s information.
      </Paragraph>
      <List>
        <ListItem>Name: {selectedType.name}</ListItem>
        <ListItem>Description: {selectedType.description}</ListItem>
        <ListItem>Created at: {selectedType.sys.createdAt}</ListItem>
      </List>
      <Button
        onClick={handleClick}
        isDisabled={!selectedType.name}
        variant={`positive`}
      >
        Add description
      </Button>
    </Stack>
  );
};

export default ContentTypesSelect;
