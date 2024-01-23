import { UserAPI } from "@contentful/app-sdk";
import { Heading, Paragraph } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import { css } from "emotion";
import React from "react";

import { APP_TITLE } from "../utils/constants";

type TypeWelcomeSection = {
  user: UserAPI;
};

export const WelcomeSection = ({ user }: TypeWelcomeSection) => (
  <React.Fragment>
    <Heading>{APP_TITLE}</Heading>
    <Heading
      as={`h2`}
      className={css({
        display: `flex`,
        alignItems: `center`,
        gap: tokens.spacing2Xs,
      })}
    >
      Hi,{` `}
      <img
        className={css({ display: `inline-block`, borderRadius: `50%` })}
        src={user.avatarUrl}
        width={20}
        height={20}
      />
      {` `}
      {user.firstName}!
    </Heading>
    <Paragraph>
      Welcome to the <b>{APP_TITLE}</b> configuration screen, a simple tool to
      help your developers make life easier for the content editors!
    </Paragraph>
    <Paragraph>
      This application is designed to provide extensive descriptions about your
      content types with the help of images and longer help texts.
    </Paragraph>
    <Paragraph>
      Let&apos;s start by creating your first description. Once you are done, go
      to the content type&apos;s settings and enable this application in your
      sidebar.
    </Paragraph>
  </React.Fragment>
);
