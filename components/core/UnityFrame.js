import * as React from "react";

import { css } from "@emotion/core";

const STYLES_CONTAINER = css`
  height: 100%;
  width: 100%;
`;

const generateTemplate = ({ gameRootUrl, unityGameConfig }) => `
<html>
<head>
  <script src="${url}/Build/UnityLoader.js"></script>
  <script>
var unityInstance= UnityLoader.instantiate("unityContainer", "${gameRootUrl}/${unityGameConfig}");
  </script>
</head>
<body style="margin:0; padding:0">
  <div id="unityContainer" style="width:100%" />
</body>
</html>
  `;

const UnityFrame = ({ url, unityGameConfig }) => {
  const gameRootUrl = url.split("/index.html")[0];

  const iframeRef = React.useCallback((node) => {
    if (node !== null) {
      const doc = node.contentWindow.document;
      doc.open();
      doc.write(generateTemplate({ gameRootUrl, unityGameConfig }));
      doc.close();
    }
  }, []);

  return <iframe ref={iframeRef} css={STYLES_CONTAINER} />;
};

export default UnityFrame;
