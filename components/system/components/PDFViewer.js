import * as React from "react";

import Head from "next/head";

import { css } from "@emotion/react";

const STYLES_DOCUMENT = css`
  margin: 0;
  padding: 20px 0 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_PAGE = css`
  margin-bottom: 20px;
`;

const PDFViewer = ({ file, clientId, ...rest }) => {
  const viewerConfig = {
    showAnnotationTools: false,
    enableFormFilling: false,
    showLeftHandPanel: false,
    showDownloadPDF: false,
    showPrintPDF: false,
    showPageControls: false,
    dockPageControls: false,
    embedMode: "IN_LINE",
  };

  const initializeViewer = () => {
    var adobeDCView = new AdobeDC.View({
      clientId,
      divId: "adobe-dc-view",
    });

    adobeDCView.previewFile(
      {
        content: {
          location: {
            url: file,
          },
        },
        metaData: { fileName: "title" },
      },
      viewerConfig
    );
  };

  React.useEffect(() => {
    document.addEventListener("adobe_dc_view_sdk.ready", initializeViewer);
  });

  return (
    <>
      <Head>
        <script src="https://documentcloud.adobe.com/view-sdk/main.js" />
      </Head>

      <div css={STYLES_DOCUMENT} {...rest}>
        <div id="adobe-dc-view" />
      </div>
    </>
  );
};

export default PDFViewer;
