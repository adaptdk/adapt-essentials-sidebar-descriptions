import { ConfigAppSDK } from "@contentful/app-sdk";
import {
  Accordion,
  Flex,
  Form,
  Heading,
  IconButton,
} from "@contentful/f36-components";
import { PlusIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { useSDK } from "@contentful/react-apps-toolkit";
import { UserProps } from "contentful-management";
import { css } from "emotion";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChangesMade from "../components/ChangesMade";
import { DescriptionEditor } from "../components/description";
import CreateModal from "../components/description/CreateModal";
import { WelcomeSection } from "../components/WelcomeSection";
import { TypeContentType, TypeDescription } from "../utils/types";

export interface AppInstallationParameters {
  descriptions?: Array<TypeDescription>;
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const [contentTypes, setContentTypes] = useState<TypeContentType[]>([]);
  const [descriptions, setDescriptions] = useState<TypeDescription[]>(
    parameters.descriptions || [],
  );
  const [users, setUsers] = useState<UserProps[] | []>([]);
  const [isOpen, setOpen] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
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
      parameters: {
        descriptions,
      },
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [descriptions, sdk]);

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

        if (currentParameters?.descriptions) {
          setDescriptions(currentParameters.descriptions);
        }
      }

      const spaceUsers = await sdk.cma.user.getManyForSpace({});
      if (spaceUsers.items?.at(0)) {
        setUsers(spaceUsers.items);
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
    setChangesMade(true);
  };

  const handleRemoveDescription = (descriptionId: string) => {
    const updatedDescriptions = descriptions.filter(
      (description) => description.id !== descriptionId,
    );

    // Update the state with the new descriptions array
    setDescriptions(updatedDescriptions);
    setChangesMade(true);
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
    setChangesMade(true);
  };

  const handleAddItem = (descriptionId: string, type: `text` | `image`) => {
    setDescriptions(
      descriptions.map((description) => {
        if (description.id === descriptionId) {
          return {
            ...description,
            items: [
              ...description.items,
              {
                id: uuidv4(),
                type: type,
                value: ``,
              },
            ],
          };
        }
        return description;
      }),
    );
    setChangesMade(true);
  };

  const handleRemoveItem = (descriptionId: string, itemId: string) => {
    setDescriptions(
      descriptions.map((description) => {
        if (description.id === descriptionId) {
          return {
            ...description,
            items: description.items.filter((item) => item.id !== itemId),
          };
        }
        return description;
      }),
    );
    setChangesMade(true);
  };

  return (
    <Flex
      flexDirection="column"
      padding={`spacing3Xl`}
      className={css({
        maxWidth: tokens.contentWidthDefault,
        margin: `0 auto`,
      })}
    >
      <ChangesMade visible={changesMade} />

      <Form>
        <WelcomeSection user={sdk.user} />

        <IconButton
          aria-label={`Create a description`}
          icon={<PlusIcon />}
          variant={`positive`}
          onClick={() => setOpen(true)}
        >
          Create a description
        </IconButton>

        <CreateModal
          setOpen={setOpen}
          isOpen={isOpen}
          contentTypes={contentTypes}
          handleAddDescription={handleAddDescription}
          closeModal={() => setOpen(false)}
          users={users}
          descriptions={descriptions}
        />

        {descriptions?.at(0) && (
          <>
            <Heading className={css({ marginTop: tokens.spacingXl })}>
              Descriptions
            </Heading>
            <Accordion>
              {descriptions.map(({ id, contentType, items }) => (
                <Accordion.Item key={id} title={contentType.name}>
                  <DescriptionEditor
                    contentType={contentType}
                    items={items}
                    handleRemove={handleRemoveDescription}
                    onItemChange={(itemId, newValue) =>
                      handleDescriptionChange(id, itemId, newValue)
                    }
                    id={id}
                    onAddItem={handleAddItem}
                    onRemoveItem={handleRemoveItem}
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
