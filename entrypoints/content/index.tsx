import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "toc-ui",
      position: "inline",
      onMount: async (container) => {
        const app = document.createElement("div");
        app.id = "awesome-toc-root";
        container.append(app);

        const isAutoLoadValue = await isAutoLoad.getValue();

        if (!isAutoLoadValue) {
          return;
        }

        const root = ReactDOM.createRoot(app);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.then((r) => r?.unmount());
      },
    });

    ui.mount();
  },
});
