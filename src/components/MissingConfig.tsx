import { Note, Paragraph, TextLink } from "@contentful/f36-components";
import { css } from "emotion";
import React from "react";

const MissingConfig = ({ appUrl }: { appUrl: string }) => (
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

export default MissingConfig;
