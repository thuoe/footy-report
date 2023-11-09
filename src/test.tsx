import {
  Action,
  ActionPanel,
  Detail,
  getPreferenceValues,
  openExtensionPreferences,
} from "@raycast/api";
import getClient from "@src/api/client";
import axios, { AxiosError } from "axios";
import { usePromise } from "@raycast/utils";

interface Preferences {
  apiKey: string;
}

const testPath = "/teams/search/Esbjerg";

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const apiKey = preferences["apiKey"];
  const client = getClient(apiKey);
  const { isLoading, data } = usePromise(
    async (testPath: string) => {
      try {
        const { status, headers } = await client.get(testPath);
        return { status, contentType: headers["content-type"]?.toString() };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          if (axiosError.response) {
            return {
              status: axiosError.response?.status,
              contentType:
                axiosError.response.headers["content-type"]?.toString(),
            };
          }
        }
      }
    },
    [testPath],
  );

  const title =
    data?.status === 200 ? "Successful Request!" : "Request Failure!";
  const message =
    data?.status === 200
      ? "Great! You can now begin using commands!"
      : "Whoops! There is a problem with your API Key!";
  const imgSrc = data?.status == 200 ? "success" : "failure";
  const image = `![](../assets/${imgSrc}.png)`;
  const markdown = `
  # ${title}
  ${message}
  ${image}
  `;

  return (
    <>
      <Detail
        isLoading={isLoading}
        navigationTitle="API Key Test"
        markdown={markdown}
        actions={
          <ActionPanel>
            <Action
              title="Open Extension Preferences"
              onAction={openExtensionPreferences}
            />
          </ActionPanel>
        }
        metadata={
          <Detail.Metadata>
            <Detail.Metadata.Label
              title="Base URL"
              text={client.defaults.baseURL}
            />
            <Detail.Metadata.Label title="Test Path" text={testPath} />
            <Detail.Metadata.TagList title="Content Type">
              <Detail.Metadata.TagList.Item
                text={data?.contentType}
                color="#B55ABE"
              />
            </Detail.Metadata.TagList>
            <Detail.Metadata.TagList title="Status">
              <Detail.Metadata.TagList.Item
                text={data?.status?.toString()}
                color={data?.status === 200 ? "#71C6B1" : "#D5562E"}
              />
            </Detail.Metadata.TagList>
          </Detail.Metadata>
        }
      />
    </>
  );
}
