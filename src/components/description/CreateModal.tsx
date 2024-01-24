import {
  Autocomplete,
  Button,
  Caption,
  Flex,
  Modal,
  Paragraph,
  SectionHeading,
} from "@contentful/f36-components";
import { Image } from "@contentful/f36-image";
import tokens from "@contentful/f36-tokens";
import { Portal } from "@contentful/f36-utils";
import { UserProps } from "contentful-management";
import { css } from "emotion";
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useMemo, useState } from "react";

import { formatDate } from "../../utils/formatting";
import { getUserById } from "../../utils/helpers";
import type { TypeContentType, TypeDescription } from "../../utils/types";

type TypeCreateModal = {
  contentTypes: Array<TypeContentType>;
  handleAddDescription: (contentType: TypeContentType) => void;
  closeModal: () => void;
  users: UserProps[];
  descriptions: TypeDescription[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
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

const CreateModal = ({
  setOpen,
  isOpen,
  contentTypes,
  handleAddDescription,
  users,
  descriptions,
}: TypeCreateModal) => {
  const [selectedType, setSelectedType] =
    useState<TypeContentType>(emptyContentType);
  const [filteredItems, setFilteredItems] = useState(contentTypes);
  const [inputValue, setInputValue] = useState(``);
  console.log({ contentTypes, filteredItems });

  useEffect(() => {
    const descriptionIds = descriptions?.at(0)
      ? descriptions.map(({ id }) => id)
      : [];

    console.log(`should not fire`);
    const filtered = contentTypes.filter(
      ({ id }) => !descriptionIds.includes(id),
    );

    if (filtered?.at(0)) {
      setFilteredItems(filtered);
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
    setOpen(false);
  };

  return (
    <Portal>
      <Modal onClose={() => setOpen(false)} isShown={isOpen}>
        {() => (
          <>
            <Modal.Header
              title="Create description"
              onClose={() => setOpen(false)}
            />
            <Modal.Content>
              <Flex
                flexDirection={`column`}
                alignItems={`flex-start`}
                gap={tokens.spacingM}
              >
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
                  Below you can confirm the selected content type&apos;s
                  information.
                </Paragraph>

                <Flex
                  flexDirection={`column`}
                  alignItems={`flex-start`}
                  gap={`0`}
                  fullWidth
                >
                  <SectionHeading>
                    {selectedType.name || `Content type`}
                  </SectionHeading>
                  <Paragraph>
                    {selectedType.description || `No description`}
                  </Paragraph>

                  <Flex
                    fullWidth
                    justifyContent={`flex-start`}
                    gap={tokens.spacingXl}
                  >
                    <Flex flexDirection={`column`}>
                      <Caption fontWeight={`fontWeightMedium`}>
                        Created at
                      </Caption>
                      <Caption>
                        {formatDate(selectedType.sys.createdAt)}
                      </Caption>
                    </Flex>

                    <Flex flexDirection={`column`} gap={tokens.spacing2Xs}>
                      <Caption fontWeight={`fontWeightMedium`}>
                        Created by
                      </Caption>
                      <Caption
                        className={css({
                          display: `flex`,
                          alignItems: `center`,
                          gap: tokens.spacing2Xs,
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
                </Flex>
                <Button
                  onClick={handleClick}
                  isDisabled={!selectedType.name}
                  variant={`positive`}
                >
                  Add description
                </Button>
              </Flex>
            </Modal.Content>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default CreateModal;
