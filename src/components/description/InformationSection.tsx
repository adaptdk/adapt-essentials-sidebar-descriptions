import { Flex, IconButton, Paragraph } from "@contentful/f36-components";
import { SettingsIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";
import { useSDK } from "@contentful/react-apps-toolkit";
import React, { useEffect, useState } from "react";

type TypeInformationSection = {
  id: string;
};

const InformationSection = ({ id }: TypeInformationSection) => {
  const sdk = useSDK();
  const [configUrl, setConfigUrl] = useState(``);

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

  return (
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
  );
};

export default InformationSection;
