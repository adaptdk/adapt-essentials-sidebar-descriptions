import { EditorAppSDK, SidebarAppSDK } from "@contentful/app-sdk";
import { useMemo } from "react";

import { TypeDescription } from "../utils/types";

export const useDescription = (sdk: EditorAppSDK | SidebarAppSDK) => {
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

  return description;
};
