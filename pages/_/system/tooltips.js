import * as React from "react";
import * as System from "~/components/system";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageTooltips extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Tooltips"
        description="..."
        url="https://slate.host/_/system/tooltips"
      >
        <System.GlobalTooltip />
        <System.H1>
          Tooltips <ViewSourceLink file="system/tooltips.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Tooltip component is used to provide the user with more
          information in a message that appears when they interact with an
          element.
        </System.P>

        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the TooltipAnchor and GlobalTooltip Components.
        </System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { TooltipAnchor, GlobalTooltip } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the <System.CodeText>GlobalTooltip</System.CodeText> at the
          root level of your document (e.g. in index.js or App.js) so it is
          accessible throughout and will not get buried in the DOM tree.
        </System.P>
        <br />
        <CodeBlock>
          {`class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalTooltip style={{ backgroundColor: "black" }} />
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <br />
        <System.P>
          Then, declare the <System.CodeText>TooltipAnchor</System.CodeText>{" "}
          component anywhere you would like a tooltip to appear.
        </System.P>
        <br />
        <System.TooltipAnchor tooltip="Hello friends!!" />
        <br />
        <br />
        <CodeBlock>{`class ExampleOne extends React.Component {
  render() {
    return <TooltipAnchor tooltip="Hello friends!!" />;
  }
}`}</CodeBlock>
        <br />
        <System.P>
          Optionally, use the <System.CodeText>style</System.CodeText> prop on
          the <System.CodeText>GlobalTooltip</System.CodeText> component to
          apply a style to all tooltip bubbles. To style a single tooltip
          bubble, use the <System.CodeText>style</System.CodeText> prop on that
          bubble's <System.CodeText>TooltipAnchor</System.CodeText>.
        </System.P>
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="TooltipAnchor">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "Output text on the tooltip bubble.",
                },
                {
                  id: 2,
                  a: "height",
                  b: "number",
                  c: "24px",
                  d: "Height of the tooltip anchor icon.",
                },
                {
                  id: 2,
                  a: "style",
                  b: "Object",
                  c: "null",
                  d:
                    "Style applied to the tooltip. Apply this prop to GlobalTooltip to apply to all tooltips, and apply it to a given TooltipAnchor to apply only to that tooltip.",
                },
                {
                  id: 2,
                  a: "anchorStyle",
                  b: "Object",
                  c: "null",
                  d:
                    "Style applied to the tooltip anchor. Apply this to the TooltipAnchor component.",
                },
                {
                  id: 2,
                  a: "children",
                  b: "SVG",
                  c: "null",
                  d:
                    "Will be rendered instead of the default question mark SVG as the tooltip anchor icon.",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
