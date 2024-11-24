import { useEffect, useState } from "react";

export const useCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState(location.href);

  useEffect(() => {
    const checkForUrlChange = () => {
      const newUrl = location.href;
      if (newUrl !== currentUrl) {
        setCurrentUrl(newUrl);
      }
    };

    const intervalId = setInterval(checkForUrlChange, 200);

    return () => clearInterval(intervalId);
  }, []);

  return currentUrl;
};
