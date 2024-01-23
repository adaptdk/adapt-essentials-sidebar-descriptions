import {
  Box,
  Button,
  Caption,
  Flex,
  IconButton,
  Modal,
  Paragraph,
  SectionHeading,
  Stack,
  Textarea,
  TextInput,
} from "@contentful/f36-components";
import { DeleteIcon, SettingsIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { Portal } from "@contentful/f36-utils";
import { useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import React, { useEffect, useState } from "react";

import { URL_REGEX } from "../utils/constants";
import type { TypeContentType, TypeDescriptionItem } from "../utils/types";

type Props = {
  id: string;
  items: Array<TypeDescriptionItem>;
  contentType: TypeContentType;
  handleRemove: (descriptionId: string) => void;
  onItemChange: (itemId: string, newValue: string) => void;
  onAddItem: (descriptionId: string, type: `text` | `image`) => void;
  onRemoveItem: (descriptionId: string, itemId: string) => void;
};

const DescriptionEditor = ({
  id,
  items,
  contentType,
  handleRemove,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: Props) => {
  const sdk = useSDK();
  const [configUrl, setConfigUrl] = useState(``);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const envId = sdk.ids.environment;

    const fetchUrl = async () => {
      try {
        const space = await sdk.cma.space.get({});
        if (space?.sys.id) {
          /* eslint-disable-next-line max-len */
          const url = `https://app.contentful.com/spaces/${space.sys.id}/environments/${envId}/content_types/${id}/sidebar_configuration`;
          setConfigUrl(url);
        }
      } catch (e) {
        console.error(`Error fetching App URL: `, e);
      }
    };

    fetchUrl();
  }, [sdk]);

  const handleDelete = () => {
    handleRemove(id);
    setOpen(false);
  };

  return (
    <Stack alignItems={`flex-start`} flexDirection={`column`}>
      <Flex gap={tokens.spacing3Xl} alignItems={`flex-start`}>
        <Paragraph>
          To add more fields, press one of the Add buttons below. To open this
          content type&apos;s sidebar configuration, press the settings icon on
          the right.
        </Paragraph>
        <IconButton
          as={`a`}
          target={`_blank`}
          href={configUrl}
          variant={`secondary`}
          aria-label="Sidebar configuration"
          icon={<SettingsIcon />}
        />
      </Flex>

      {items?.at(0) &&
        items.map(({ id: itemId, type, value }) => {
          const validUrl = URL_REGEX.test(value);

          switch (type) {
            case `text`:
              return (
                <Box key={itemId} className={css({ width: `100%` })}>
                  <SectionHeading
                    className={css({ marginBottom: tokens.spacingXs })}
                  >
                    Text field
                  </SectionHeading>

                  <Flex
                    fullWidth
                    key={itemId}
                    alignItems={`flex-start`}
                    gap={tokens.spacingS}
                  >
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

            case `image`:
              return (
                <Box key={itemId} className={css({ width: `100%` })}>
                  <SectionHeading
                    className={css({ marginBottom: tokens.spacingXs })}
                  >
                    Image field
                  </SectionHeading>

                  <Flex
                    fullWidth
                    alignItems={`flex-start`}
                    gap={tokens.spacingS}
                  >
                    <TextInput
                      type={`url`}
                      placeholder={`Image URL`}
                      isInvalid={!validUrl}
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

                  {!validUrl && (
                    <Caption className={css({ color: tokens.red600 })}>
                      Has to be a valid image URL
                    </Caption>
                  )}
                </Box>
              );

            default:
              return null;
          }
        })}
      <Flex gap={tokens.spacingM}>
        <Button variant={`positive`} onClick={() => onAddItem(id, `text`)}>
          Add Text field
        </Button>
        <Button variant={`positive`} onClick={() => onAddItem(id, `image`)}>
          Add Image field
        </Button>
        <IconButton
          aria-label={`Delete description`}
          variant={`negative`}
          icon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete description
        </IconButton>
      </Flex>
      <Portal>
        <Modal onClose={() => setOpen(false)} isShown={isOpen}>
          {() => (
            <>
              <Modal.Header
                title={`Delete ${contentType.name}?`}
                onClose={() => setOpen(false)}
              />
              <Modal.Content>
                <Paragraph>
                  Are you sure you want to delete the{` `}
                  <strong>{contentType.name}</strong>
                  {` `}
                  description configuration?
                </Paragraph>
                <Paragraph>
                  This action can be reversed only by leaving or refreshing the
                  page without saving changes, meaning you would lose all
                  progress!
                </Paragraph>
              </Modal.Content>
              <Modal.Controls>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete} variant={`negative`}>
                  Delete
                </Button>
              </Modal.Controls>
            </>
          )}
        </Modal>
      </Portal>
    </Stack>
  );
};

export default DescriptionEditor;
