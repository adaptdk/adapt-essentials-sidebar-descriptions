import { Box, Note } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";

type TypeChangesMade = {
  visible: boolean;
};

const ChangesMade = ({ visible }: TypeChangesMade) => (
  <Box
    className={css({
      position: `fixed`,
      right: tokens.spacingS,
      top: tokens.spacingS,
      maxWidth: `300px`,
      opacity: visible ? `1` : 0,
      transition: `opacity 0.2s ease-in-out`,
    })}
  >
    <Note>
      You have unsaved changes. Don&apos;t forget to hit <strong>Save</strong>
      {` `}
      when you are done!
    </Note>
  </Box>
);

export default ChangesMade;
