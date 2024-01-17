import { ConfigAppSDK } from "@contentful/app-sdk";
import {
  Accordion,
  Button,
  Flex,
  Form,
  Heading,
  Modal,
  Paragraph,
} from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ContentTypesSelect from "../components/ContentTypesSelect";
import DescriptionEditor from "../components/DescriptionEditor";
import { TypeContentType, TypeDescription } from "../utils/types";

export interface AppInstallationParameters {}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const [contentTypes, setContentTypes] = useState<TypeContentType[]>([]);
  const [descriptions, setDescriptions] = useState<TypeDescription[]>([]);
  const [isOpen, setOpen] = useState(false);
  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      const query = await sdk.cma.contentType.getMany({});
      if (query && query.items && query.items.length > 0) {
        const types = query.items.map((item) => ({
          name: item.name,
          description: item.description,
          id: item.sys.id,
          sys: item.sys,
        }));

        if (types) {
          types.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          setContentTypes(types);
        }
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const handleAddDescription = (contentType: TypeContentType) => {
    const descriptionsClone = [...descriptions];
    const filteredTypes = contentTypes.filter(
      (type) => type.id !== contentType.id,
    );

    const description = {
      id: contentType.id,
      contentType,
      items: [
        {
          id: uuidv4(),
          type: `text`,
          value: ``,
        },
      ],
    };

    descriptionsClone.push(description);
    setDescriptions(descriptionsClone);
    setContentTypes(filteredTypes);
  };

  const handleDescriptionChange = (
    descriptionId: string,
    itemId: string,
    newValue: string,
  ) => {
    setDescriptions(
      descriptions.map((description) => {
        if (description.id === descriptionId) {
          return {
            ...description,
            items: description.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, value: newValue };
              }
              return item;
            }),
          };
        }
        return description;
      }),
    );
  };

  const handleAddItem = (descriptionId: string) => {
    setDescriptions(
      descriptions.map((description) => {
        if (description.id === descriptionId) {
          return {
            ...description,
            items: [
              ...description.items,
              {
                id: uuidv4(),
                type: `text`, // or any default type you want
                value: ``,
              },
            ],
          };
        }
        return description;
      }),
    );
  };

  return (
    <Flex
      flexDirection="column"
      className={css({ margin: `80px`, maxWidth: `800px` })}
    >
      <Form>
        <Heading>App Config</Heading>
        <Paragraph>
          Welcome to your contentful app. This is your config page.
        </Paragraph>

        <Button variant={`positive`} onClick={() => setOpen(true)}>
          Create a description
        </Button>

        <Modal onClose={() => setOpen(false)} isShown={isOpen}>
          {() => (
            <>
              <Modal.Header
                title="Create description"
                onClose={() => setOpen(false)}
              />
              <Modal.Content>
                <ContentTypesSelect
                  contentTypes={contentTypes}
                  handleAddDescription={handleAddDescription}
                  closeModal={() => setOpen(false)}
                />
              </Modal.Content>
            </>
          )}
        </Modal>
        {descriptions?.at(0) && (
          <>
            <Heading>Descriptions</Heading>
            <Accordion>
              {descriptions.map(({ id, contentType, items }) => (
                <Accordion.Item key={id} title={contentType.name}>
                  <DescriptionEditor
                    items={items}
                    onItemChange={(itemId, newValue) =>
                      handleDescriptionChange(id, itemId, newValue)
                    }
                    onAddItem={() => handleAddItem(id)}
                  />
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        )}
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
