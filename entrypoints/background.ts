import { browser } from "wxt/browser";

export default defineBackground(() => {
  // 创建右键菜单
  browser.contextMenus.create({
    id: "toggle-toc",
    title: "Toggle Table of Contents",
    contexts: ["page", "selection"],
  });

  // 监听右键菜单点击事件
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "toggle-toc" && tab?.id) {
      browser.tabs.sendMessage(tab.id, {
        type: "toggle-toc",
      });
    }
  });

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
