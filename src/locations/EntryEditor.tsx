import { EditorAppSDK } from "@contentful/app-sdk";
import {
  Box,
  Flex,
  Heading,
  Note,
  Paragraph,
  TextLink,
} from "@contentful/f36-components";
import { Image } from "@contentful/f36-image";
import tokens from "@contentful/f36-tokens";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import React, { useEffect, useMemo, useState } from "react";

import ConfigButton from "../components/ConfigButton";
import MarkdownRender from "../components/MarkdownRender";
import { TypeDescription } from "../utils/types";

const EntryEditor = () => {
  const sdk = useSDK<EditorAppSDK>();
  const [appUrl, setAppUrl] = useState(``);
  const currentEntryId = useMemo(
    () => sdk.entry.getSys().contentType.sys.id,
    [sdk],
  );
  const description: TypeDescription = useMemo(() => {
    const descriptions = sdk.parameters.installation.descriptions;

    if (descriptions) {
      return descriptions.find(
        (item: TypeDescription) => item.id == currentEntryId,
      );
    }
  }, [sdk]);

  useEffect(() => {
    const envId = sdk.ids.environment;
    const appId = sdk.ids.app;

    const fetchUrl = async () => {
      try {
        const space = await sdk.cma.space.get({});
        if (space?.sys.id) {
          /* eslint-disable-next-line max-len */
          const url = `https://app.contentful.com/spaces/${space.sys.id}/environments/${envId}/apps/${appId}`;
          setAppUrl(url);
        }
      } catch (e) {
        console.error(`Error fetching App URL: `, e);
      }
    };

    fetchUrl();
  }, [sdk]);

  if (!description) {
    return (
      <Note variant={`negative`}>
        This Content Type does not have a Description configured yet.
        {appUrl && (
          <Paragraph className={css({ marginBottom: 0 })}>
            Configure your description{` `}
            <TextLink href={appUrl} target={`_blank`}>
              here.
            </TextLink>
          </Paragraph>
        )}
      </Note>
    );
  }

  return (
    <Box
      padding={`spacingM`}
      className={css({
        maxWidth: tokens.contentWidthDefault,
        margin: `0 auto`,
      })}
    >
      <Flex
        alignItems={`flex-start`}
        justifyContent={`space-between`}
        gap={`spacingM`}
      >
        <Heading>{sdk.contentType.name} - Advanced Description</Heading>
        <ConfigButton url={appUrl} />
      </Flex>

      {description.items?.at(0) && (
        <Flex flexDirection={`column`}>
          {description.items.map((item) => {
            if (item.type === `text`) {
              return <MarkdownRender key={item.id} value={item.value} />;
            }

            if (item.type === `image`) {
              return (
                <Image
                  key={item.id}
                  src={item.value}
                  alt={``}
                  width={`auto`}
                  height={`100%`}
                  className={css({
                    marginTop: tokens.spacingS,
                    marginBottom: tokens.spacingS,
                    maxWidth: `1240px`,
                  })}
                />
              );
            }
          })}
        </Flex>
      )}
    </Box>
  );
};

export default EntryEditor;
