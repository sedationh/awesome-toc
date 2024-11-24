export const isAutoLoadStorage = storage.defineItem<boolean>("sync:isAutoLoad", {
  defaultValue: true,
});

export const isFixedExpandedAllStorage = storage.defineItem<boolean>(
  "sync:isFixedExpandedAll",
  {
    defaultValue: false,
  }
);
