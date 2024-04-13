import { browser } from "wxt/browser";

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command) => {
    if (command === "toggle-toc") {
      // 向当前有焦点的标签页发送消息
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs?.length === 0) {
        return;
      }
      const currentTab = tabs[0].id!;
      browser.tabs.sendMessage(currentTab, {
        type: "toggle-toc",
      });
    }
  });
});
