import {
  Autocomplete,
  Button,
  Caption,
  Flex,
  Paragraph,
  SectionHeading,
  Stack,
} from "@contentful/f36-components";
import { Image } from "@contentful/f36-image";
import tokens from "@contentful/f36-tokens";
import { UserProps } from "contentful-management";
import { css } from "emotion";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";

import { formatDate } from "../utils/formatting";
import { getUserById } from "../utils/helpers";
import { TypeContentType, TypeDescription } from "../utils/types";

type Props = {
  contentTypes: Array<TypeContentType>;
  handleAddDescription: (contentType: TypeContentType) => void;
  closeModal: () => void;
  users: UserProps[];
  descriptions: TypeDescription[];
};

const emptyContentType = {
  name: ``,
  id: ``,
  description: ``,
  sys: {
    type: ``,
    id: ``,
    version: 1,
    updatedAt: ``,
    createdAt: ``,
    createdBy: {
      sys: {
        id: ``,
        type: ``,
        linkType: ``,
      },
    },
  },
};

const ContentTypesSelect = ({
  contentTypes,
  handleAddDescription,
  closeModal,
  users,
  descriptions,
}: Props) => {
  const [selectedType, setSelectedType] =
    useState<TypeContentType>(emptyContentType);
  const [filteredItems, setFilteredItems] = useState(contentTypes);
  const [inputValue, setInputValue] = useState(``);

  useEffect(() => {
    const descriptionIds = descriptions?.at(0)
      ? descriptions.map(({ id }) => id)
      : [];

    if (descriptionIds.length > 0) {
      const filtered = contentTypes.filter(
        ({ id }) => !descriptionIds.includes(id),
      );

      if (filtered?.at(0)) {
        setFilteredItems(filtered);
      }
    }
  }, [descriptions, contentTypes]);

  const user = useMemo(
    () => getUserById(selectedType.sys?.createdBy?.sys?.id, users),
    [selectedType, users],
  );

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelectItem = (item: TypeContentType) => {
    setSelectedType(item);
  };

  const renderItem = (item: TypeContentType) => item.name;

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

      <Stack
        flexDirection={`column`}
        alignItems={`flex-start`}
        className={css({ gap: 0 })}
        fullWidth
      >
        <SectionHeading>{selectedType.name || `Content type`}</SectionHeading>
        <Paragraph>{selectedType.description || `No description`}</Paragraph>

        <Flex fullWidth justifyContent={`flex-start`} gap={tokens.spacingXl}>
          <Flex flexDirection={`column`}>
            <Caption fontWeight={`fontWeightMedium`}>Created at</Caption>
            <Caption>{formatDate(selectedType.sys.createdAt)}</Caption>
          </Flex>

          <Flex flexDirection={`column`} className={css({ gap: `0.25rem` })}>
            <Caption fontWeight={`fontWeightMedium`}>Created by</Caption>
            <Caption
              className={css({
                display: `flex`,
                alignItems: `center`,
                gap: `0.25rem`,
              })}
            >
              {user && (
                <Image
                  src={user?.avatarUrl}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  width={`20px`}
                  height={`20px`}
                  className={css({
                    borderRadius: tokens.borderRadiusMedium,
                  })}
                />
              )}
              {user?.firstName} {user?.lastName}
            </Caption>
          </Flex>
        </Flex>
      </Stack>
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
