import { EditorAppSDK } from "@contentful/app-sdk";
import { Box, Flex, Heading } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import { useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import React from "react";

import ConfigButton from "../components/ConfigButton";
import DescriptionRender from "../components/description/DescriptionRender";
import MissingConfig from "../components/MissingConfig";
import { useAppUrl, useDescription } from "../hooks";

const EntryEditor = () => {
  const sdk = useSDK<EditorAppSDK>();
  const appUrl = useAppUrl(sdk);
  const description = useDescription(sdk);

  if (!description) {
    return <MissingConfig appUrl={appUrl} />;
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

      {description.items?.at(0) && <DescriptionRender {...description} />}
    </Box>
  );
};

export default EntryEditor;
