const isNode = typeof window === "undefined" || typeof process !== "undefined";
const isDev = process.env.NODE_ENV === "development";

const logger = (...args: any[]) => {
  if (isDev) {
    return;
  }

  if (isNode) {
    console.log("[awesome-toc]", JSON.parse(JSON.stringify(args)));
  } else {
    console.log("[awesome-toc]", ...args);
  }
};

export default logger;
