import React from "react";
import { Assistant } from "@petercatai/assistant";
import "@petercatai/assistant/style";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const PeterCatAssistant = ({ token }: { token: string }) => (
  <Assistant
    token={token}
    showBubble={true}
    isVisible={false}
    apiDomain="https://api.petercat.ai"
  />
);

export default function Root({ children }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const token = customFields.peterCatAssistantToken as string;

  return (
    <>
      <PeterCatAssistant token={token} />
      {children}
    </>
  );
}
