import * as React from "react";
import * as Strings from "~/common/strings";
import * as Logging from "~/common/logging";

export class Link extends React.Component {
  state = {
    href: this.props.href
      ? this.props.href
      : this.props.params
      ? Strings.getQueryStringFromParams(this.props.params)
      : null,
  };

  static defaultProps = {
    onUpdate: () => {
      Logging.error(
        `ERROR: onUpdate is missing from a Link object called with href ${this.props.href}`
      );
    },
  };

  _handleClick = (e) => {
    if (!this.state.href) {
      return;
    }

    const isLeftClick = event.button === 0; //NOTE(martina): should process right clicks normally

    const isModified = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey; //NOTE(martina): should process ctrl/shift/etc + click normally

    const hasNoTarget = !this.props.target; //NOTE(martina): should process normally if specify opening in another tab etc.

    if (!isLeftClick || isModified || !hasNoTarget) {
      return; //NOTE(martina): always allow ctrl + click or right click to continue, and don't trigger an onClick
    }

    e.preventDefault(); //NOTE(martina): prevents the anchor component from getting clicked, so that we can handle the behavior manually
    e.stopPropagation();

    if (this.props.onClick) {
      this.props.onClick(); //NOTE(martina): onClick is triggered whether or not it is disabled
    }

    if (this.props.disabled) {
      return; //NOTE(martina): disabled = true disables the onAction from firing
    }

    if (this.props.href) {
      this.props.onAction({
        type: "NAVIGATE",
        href: this.props.href,
        callback: this.props.callback,
        redirect: this.props.redirect,
      });
    } else {
      this.props.onAction({
        type: "UPDATE_PARAMS",
        params: this.props.params,
        callback: this.props.callback,
        redirect: this.props.redirect,
      });
    }
  };

  render() {
    return (
      <span onClick={this._handleClick}>
        <a
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            ...this.props.style,
          }}
          css={this.props.css}
          target={this.props.target}
          href={this.state.href}
          aria-label={this.props["aria-label"]}
          title={this.props.title}
        >
          {this.props.children}
        </a>
      </span>
    );
  }
}
