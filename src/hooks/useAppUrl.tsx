import { EditorAppSDK, SidebarAppSDK } from "@contentful/app-sdk";
import { useEffect, useState } from "react";

export const useAppUrl = (sdk: EditorAppSDK | SidebarAppSDK) => {
  const [appUrl, setAppUrl] = useState(``);

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

  return appUrl;
};
