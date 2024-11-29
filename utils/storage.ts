export const isAutoLoadStorage = storage.defineItem<boolean>("sync:isAutoLoad", {
  defaultValue: false,
});

export const isFixedExpandedAllStorage = storage.defineItem<boolean>(
  "sync:isFixedExpandedAll",
  {
    defaultValue: false,
  }
);
