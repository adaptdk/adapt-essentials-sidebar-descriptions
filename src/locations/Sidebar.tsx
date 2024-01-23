import { SidebarAppSDK } from "@contentful/app-sdk";
import {
  Box,
  Flex,
  Note,
  Paragraph,
  TextLink,
} from "@contentful/f36-components";
import { Image } from "@contentful/f36-image";
import tokens from "@contentful/f36-tokens";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import React, { useEffect, useMemo, useState } from "react";

import { TypeDescription } from "../utils/types";

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
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

  console.log(description);

  return (
    <Box>
      {description.items?.at(0) && (
        <Flex flexDirection={`column`}>
          {description.items.map((item) => {
            if (item.type === `text`) {
              return <Paragraph key={item.id}>{item.value}</Paragraph>;
            }

            if (item.type === `image`) {
              return (
                <Image
                  key={item.id}
                  src={item.value}
                  alt={``}
                  width={`100%`}
                  height={`auto`}
                  className={css({
                    marginTop: tokens.spacingS,
                    marginBottom: tokens.spacingS,
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

export default Sidebar;
