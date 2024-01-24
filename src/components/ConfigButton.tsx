import { IconButton, Text } from "@contentful/f36-components";
import { SettingsIcon } from "@contentful/f36-icons";
import React from "react";

type TypeConfigButton = {
  url: string;
};

const ConfigButton = ({ url }: TypeConfigButton) => {
  if (!url) {
    return null;
  }

  return (
    <IconButton
      as={`a`}
      target={`_blank`}
      href={url}
      variant={`secondary`}
      aria-label="Open configuration"
      icon={<SettingsIcon />}
    >
      <Text marginLeft={`spacing2Xs`} fontWeight={`fontWeightMedium`}>
        Open configuration
      </Text>
    </IconButton>
  );
};

export default ConfigButton;
