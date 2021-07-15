import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import Dismissible from "~/components/core/Dismissible";

const STYLES_AVATAR = css`
  display: inline-flex;
  background-size: cover;
  background-position: 50% 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 4px;
  background-color: ${Constants.system.black};
`;

const STYLES_AVATAR_ONLINE = css`
  height: 16px;
  width: 16px;
  background-color: ${Constants.system.green};
  border: 2px solid ${Constants.system.white};
  position: absolute;
  bottom: -4px;
  right: -4px;
  border-radius: 16px;
`;

function BoringAvatar(props) {
  let colors = ['A9B9C1', '5B6B74', '3C444A', 'D4DBDF', '293137'];
  let avatarUrl = `https://source.boringavatars.com/marble/${props.size}/${props.userId}?square&colors=${colors}`;
  return (
    <Dismissible
      captureResize={false}
      captureScroll={true}
    >
      <img 
        src={avatarUrl} 
        css={STYLES_AVATAR}
        style={{
          width: `${props.size}px`, 
          height: `${props.size}px`,
          cursor: "pointer",
        }} 
      />
    </Dismissible>
  );
}

function UploadedAvatar(props) {
  return (
    <Dismissible
        css={STYLES_AVATAR}
        captureResize={false}
        captureScroll={true}
        style={{
          ...props.style,
          width: `${props.size}px`,
          height: `${props.size}px`,
          backgroundImage: `url('${props.url}')`,
          cursor: "pointer",
        }}
      >
        {props.visible ? props.popover : null}
        {props.online ? <span css={STYLES_AVATAR_ONLINE} /> : null}
      </Dismissible> 
  )
}

export default class ProfilePhoto extends React.Component {  
  render() {
    return (
      <>
        {this.props.user.data.photo
          ? <UploadedAvatar url={this.props.user.data.photo} size={this.props.size} />
          : <BoringAvatar userId={this.props.user.id} size={this.props.size} />
        }
      </>
    );
  }
}
