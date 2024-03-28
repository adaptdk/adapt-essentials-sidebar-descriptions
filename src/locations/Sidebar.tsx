import { SidebarAppSDK } from "@contentful/app-sdk";
import { Box } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import React from "react";

import DescriptionRender from "../components/description/DescriptionRender";
import MissingConfig from "../components/MissingConfig";
import { useAppUrl, useDescription } from "../hooks";

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const appUrl = useAppUrl(sdk);
  const description = useDescription(sdk);

  if (!description) {
    return <MissingConfig appUrl={appUrl} />;
  }

  return (
    <Box>
      {description.items?.at(0) && (
        <DescriptionRender {...description} isSidebar />
      )}
    </Box>
  );
};

export default Sidebar;
