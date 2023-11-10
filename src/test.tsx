import {
  Action,
  ActionPanel,
  Detail,
  openExtensionPreferences,
} from "@raycast/api";
import { useSportMonksClient } from "@src/hooks";

const testPath = "/teams/search/Esbjerg";

export default function Command() {
  const { isLoading, data } = useSportMonksClient({
    method: "get",
    path: testPath,
  });
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
            <Detail.Metadata.Label title="Base URL" text={data?.baseURL} />
            <Detail.Metadata.Label title="Test Path" text={testPath} />
            <Detail.Metadata.TagList title="Content Type">
              <Detail.Metadata.TagList.Item
                text={data?.headers["content-type"]}
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
