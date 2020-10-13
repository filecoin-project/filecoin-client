import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { WarningMessage } from "~/components/core/WarningMessage";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_VIDEO_BIG = css`
  display: block;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 48px auto 88px auto;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 32px auto 64px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto 48px auto;
  }
`;

export default class SceneHome extends React.Component {
  _handleCreateSlate = () => {
    this.props.onAction({
      type: "NAVIGATE",
      value: "V1_NAVIGATION_WILL_SCENE",
      data: null,
    });
  };

  render() {
    let hasChildren = false;
    if (this.props.viewer && this.props.viewer.library[0].children.length) {
      hasChildren = true;
    }

    return (
      <ScenePage>
        <ScenePageHeader title="Scene Will">
          {hasChildren
            ? "Welcome back! Here is your data."
            : "Welcome to Slate! You can share files with anyone in the world. Here is how it works:"}
        </ScenePageHeader>
        I like Cake
      </ScenePage>
    );
  }
}
