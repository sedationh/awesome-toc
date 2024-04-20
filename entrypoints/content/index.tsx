import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

class Toc {
  root: ReactDOM.Root | null = null;
  container: HTMLElement | null = null;
  app: HTMLElement | null = null;

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  isMounted() {
    return !!this.app?.innerHTML;
  }

  toggle() {
    if (this.isMounted()) {
      this.unmount();
    } else {
      this.mount();
    }
  }

  mount() {
    if (this.root && this.app) {
      this.root = ReactDOM.createRoot(this.app);
      this.root.render(<App />);
      return;
    }

    if (!this.container) {
      return;
    }

    const app = document.createElement("div");
    app.id = "awesome-toc-root";
    this.app = app;
    this.container.append(app);

    const root = ReactDOM.createRoot(app);
    this.root = root;
    root.render(<App />);
    return root;
  }

  unmount() {
    this.root?.unmount();
  }
}

const toc = new Toc();

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "toc-ui",
      position: "overlay",
      onMount: async (container) => {
        toc.setContainer(container);
        const isAutoLoadValue = await isAutoLoad.getValue();

        if (!isAutoLoadValue) {
          return;
        }

        return toc.mount();
      },
      onRemove: (root) => {
        toc.unmount();
      },
    });

    ui.mount();
  },
});

// onMessage toggle-toc
browser.runtime.onMessage.addListener((message) => {
  if (message.type === "toggle-toc") {
    toc.toggle();
  }
});
