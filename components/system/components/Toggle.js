import * as React from 'react';
import * as Constants from '../util/constants';

import { css } from '@emotion/react';

const STYLES_TOGGLE = css`
  display: inline-flex;
  height: 40px;
  border-radius: 40px;
  width: 80px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  background: ${Constants.system.black};
  transition: background 200ms ease;
  cursor: pointer;
  user-select: none;
`;

const STYLES_DIAL = css`
  height: 32px;
  width: 32px;
  border-radius: 32px;
  margin-top: 4px;
  margin-left: 4px;
  background: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  transition: transform 200ms ease;
`;

export class Toggle extends React.Component {
  _handleChange = () => {
    this.props.onChange({
      target: { name: this.props.name, value: !this.props.active },
    });
  };

  render() {
    return (
      <div
        css={STYLES_TOGGLE}
        onClick={this._handleChange}
        style={{
          backgroundColor: this.props.active ? Constants.system.brand : null,
        }}>
        <figure css={STYLES_DIAL} style={{ transform: this.props.active ? `translateX(40px)` : null }} />
      </div>
    );
  }
}
