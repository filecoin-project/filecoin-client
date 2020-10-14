import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as FileUtilities from "~/common/file-utilities";
import * as SVG from "~/common/svg";
import { css } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";
import { TabGroup } from "~/components/core/TabGroup";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "~/components/system/components/Buttons";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";
import Avatar from "~/components/core/Avatar";




const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_USER_ENTRY = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
  border: 1px solid ${Constants.system.lightBorder};
  border-radius: 4px;
  margin-bottom: 8px;
`;

const STYLES_USER = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: 24px;
  color: ${Constants.system.brand};
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 12px 16px;
  }
`;

const STYLES_BUTTONS = css`
  justify-self: end;
  display: flex;
  flex-direction: row;
  margin-right: 48px;
  justify-content: flex-end;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 8px;
  }
`;

const STYLES_ITEM_BOX = css`
  position: relative;
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 48px;
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 8px;
  }
`;

const STYLES_ACTION_BUTTON = css`
  cursor: pointer;
  padding: 8px;
  color: ${Constants.system.brand};
  font-family: ${Constants.font.medium};
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  height: 24px;
  width: 24px;
  margin-right: 16px;
  border-radius: 4px;
`;

const STYLES_MESSAGE = css`
  color: ${Constants.system.black};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const STYLES_NAME = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function UserEntry({ user, button, onClick, message }) {
  return (
    <div key={user.username} css={STYLES_USER_ENTRY}>
      <div css={STYLES_USER} onClick={onClick}>
        <div
          css={STYLES_PROFILE_IMAGE}
          style={{ backgroundImage: `url(${user.data.photo})` }}
        />
        <span css={STYLES_NAME}>
          {user.data.name || `@${user.username}`}
          {message ? <span css={STYLES_MESSAGE}>{message}</span> : null}
        </span>
      </div>
      {button}
    </div>
  );
}

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

export default class SceneDirectory extends React.Component {
  _ref;

  state = {
    copyValue: "",
    loading: false,
    tab: 0,
    contextMenu: null,
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
      this._handleHide();
    });
  };

  _handleHide = (e) => {
    this.setState({ contextMenu: null });
  };

  _handleClick = (e, value) => {
    e.stopPropagation();
    if (this.state.contextMenu === value) {
      this._handleHide();
    } else {
      this.setState({ contextMenu: value });
    }
  };

  _handleDelete = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    const response = await Actions.deleteTrustRelationship({
      id: id,
    });
    await this.props.onRehydrate();
  };

  _handleAccept = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    const response = await Actions.updateTrustRelationship({
      userId: id,
    });
    await this.props.onRehydrate();
  };

  _handleFollow = async (e, id) => {
    this._handleHide();
    e.stopPropagation();
    const response = await Actions.createSubscription({
      userId: id,
    });
    await this.props.onRehydrate();
  };

  render() {

    return (
      <ScenePage>
        <ScenePageHeader title="Directory" />
        <TabGroup
          tabs={["Profile", "Data Storage", "Danger"]}
          value={this.state.tab}
          onChange={(value) => this.setState({ tab: value })}
        />
        {this.state.tab === 0 ? (
            <EmptyState>
              <System.DescriptionGroup
                      style={{ marginTop: 48 }}
                      label="Avatar image"
                      description="This image will appear in various lists."
                    />
            
                    <Avatar
                      style={{ marginTop: 24 }}
                      size={256}
                      url={this.props.viewer.data.photo}
                    />
            
                    <div style={{ marginTop: 24 }}>
                      <input
                        css={STYLES_FILE_HIDDEN}
                        type="file"
                        id="file"
                        onChange={this._handleUpload}
                      />
                      <System.ButtonPrimary
                        style={{ margin: "0 16px 16px 0" }}
                        type="label"
                        htmlFor="file"
                        loading={this.state.changingAvatar}
                      >
                        Pick avatar
                      </System.ButtonPrimary>
                    </div>
                    
            </EmptyState>
          )
         : null}
         {this.state.tab === 1 ? (
              <EmptyState>
                <System.DescriptionGroup
                        style={{ marginTop: 48 }}
                        label="Allow Slate to make Filecoin archive storage deals on your behalf"
                        description="If this box is checked, then we will make Filecoin archive storage deals on your behalf. By default these storage deals are not encrypted and anyone can retrieve them from the Filecoin Network."
                      />
              
                      <System.CheckBox
                        style={{ marginTop: 48 }}
                        name="allow_filecoin_directory_listing"
                        value={this.state.allow_filecoin_directory_listing}
                        onChange={this._handleCheckboxChange}
                      >
                        Show your successful deals on a directory page where others can
                        retrieve them.
                      </System.CheckBox>
              
                      <System.CheckBox
                        style={{ marginTop: 24 }}
                        name="allow_automatic_data_storage"
                        value={this.state.allow_automatic_data_storage}
                        onChange={this._handleCheckboxChange}
                      >
                        Allow Slate to make archive storage deals on your behalf to the
                        Filecoin Network. You will get a receipt in the Filecoin section.
                      </System.CheckBox>
              
                      <System.CheckBox
                        style={{ marginTop: 24 }}
                        name="allow_encrypted_data_storage"
                        value={this.state.allow_encrypted_data_storage}
                        onChange={this._handleCheckboxChange}
                      >
                        Force encryption on archive storage deals (only you can see retrieved
                        data from the Filecoin network).
                      </System.CheckBox>
              
                     asdf
              </EmptyState>
            )
           : null}
           {this.state.tab === 2 ? (
               <EmptyState>
                 <System.DescriptionGroup
                         style={{ marginTop: 48 }}
                         label="Avatar image"
                         description="This image will appear in various lists."
                       />
               
                      DAT
               </EmptyState>
             )
            : null}
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          tabIndex="-1"
          css={STYLES_COPY_INPUT}
        />
      </ScenePage>
    );
  }
}
