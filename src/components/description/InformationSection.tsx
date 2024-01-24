import { Flex, Paragraph } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import { useSDK } from "@contentful/react-apps-toolkit";
import React, { useEffect, useState } from "react";

import ConfigButton from "../ConfigButton";

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
    <Flex
      gap={tokens.spacing3Xl}
      alignItems={`flex-start`}
      justifyContent={`space-between`}
    >
      <Paragraph>
        To add more fields, press one of the <strong>Add</strong> buttons below.
        To open this content type&apos;s sidebar configuration, press the
        configuration button on the right.
      </Paragraph>
      <ConfigButton url={configUrl} />
    </Flex>
  );
};

export default InformationSection;
