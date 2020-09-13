import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_GRAPH_CONTAINER = css`
  display: flex;
`;

const STYLES_GRAPH = css`
  height: 600px;
  margin: auto;
  background-image: linear-gradient(${Constants.system.pitchBlack}, ${Constants.system.slate});
`;

const STYLES_X_LINE = css`
  stroke: ${Constants.system.wall};
`;

const STYLES_CHART_CIRCLE = css`
  stroke: none;
  fill: ${Constants.system.blue};
`;

const STYLES_CHART_LINE = css`
  stroke: ${Constants.system.blue};
  fill: none;
`;

const STYLES_CHART_TEXT = css`
  font-size: ${Constants.typescale.lvl1};
  fill: ${Constants.system.white};
  font-family: ${Constants.font.text};
`;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    minX: {},
    maxX: {},
    minY: {},
    maxY: {},
    deltaX: {},
    deltaY: {},
    bufferX: {},
    ticks: [],
    xLabel: {},
    yLabel: {},
    organizedData: [],
    circles: [],
  };

  componentDidMount() {
    this.getXLabel();
    this.getYLabel();
    this.getMinX();
    this.getMaxX();
    this.getMinY();
    this.getMaxY();
    this.sepCategories();
    this.getTicks();

  }

  //Reference used by createTicks to display shorter month names
  monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //Set Axis Labels
  getXLabel() {
    const { data } = this.props;
    let allLabels = Object.keys(data[0]);
    this.setState({
      xLabel: allLabels[0],
    });
  }

  getYLabel() {
    const { data } = this.props;
    let allLabels = Object.keys(data[0]);
    this.setState({
      yLabel: allLabels[2],
    });
  }

    //Get Min & Max X
    getMinX() {
      const { data } = this.props;
      let dates = data.sort(this.sortDates("date"));
      this.setState({
        minX: dates[0].date,
      });
      return dates[0].date;
    }
  
    getMaxX() {
      const { data } = this.props;
      let dates = data.sort(this.sortDates("date"));
      this.setState({
        maxX: dates[data.length - 1].date,
      });
      return dates[data.length - 1].date;
    }

  //Get Min & Max Y Values
  getMinY() {
    const { data } = this.props;
    let y = {};
    let values = data.map((x) => {
      y = x.value;
      return y;
    });

    this.setState({
      //Spread operator is slow!! refactor to use for loop or .reduce
      minY: Math.min(...values),
    });
    return Math.min(...values);
  }

  getMaxY() {
    const { data } = this.props;
    let y = {};
    let values = data.map((x) => {
      y = x.value;
      return y;
    });
    this.setState({
      maxY: Math.max(...values),
    });
    return Math.max(...values);
  }

  getTicks() {
    const { data } = this.props;
    const { maxTicks } = this.props;
    const { xWall } = this.props;
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    let diffX = maxX - minX;
    let dX = xWall / diffX;
    let bufferX = (600 - xWall) / 2;
    const allTicks = [];
    const dates = data.map((z) => {
      let t = {
        date: "",
        x: "",
      };
      t.date = z.date;
      t.x = Math.floor((Date.parse(z.date) - minX) * dX + bufferX);
      return t;
    });
    dates.sort(this.sortDates("x"));
    const delta = Math.ceil(dates.length / maxTicks);
    for (let i = 0; i < dates.length; i = i + delta) {
      allTicks.push(dates[i]);
    }
    this.setState((prevState) => ({
      ticks: [...prevState.ticks, allTicks],
    }));
  }

  sortDates(key) {
    return function innerSort(a, b) {
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return comparison;
    };
  }
  //Organize Categories Into Seperate Arrays within a Larger Array
  sepCategories() {
    const { data } = this.props;
    if (data) {
      const oData = [];
      const category1 = [];
      const category2 = [];
      const category3 = [];

      data.forEach((data) => {
        if (data.category == "1") {
          category1.push(data);
        }
        if (data.category == "2") {
          category2.push(data);
        }
        if (data.category == "3") {
          category3.push(data);
        }
      });

      oData.push(category1);
      oData.push(category2);
      oData.push(category3);

      this.setState((prevState) => ({
        organizedData: [...prevState.organizedData, oData],
      }));
      this.createCoordinates(oData);
    }
  }

  //Map through arrays of arrays of an array of objects and add x and y key/value pairs to each object.
  createCoordinates(z) {
    const { yCeiling } = this.props;
    const { xWall } = this.props;
    const oData = z;
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    const maxY = this.getMaxY();
    const minY = this.getMinY();
    let diffY = maxY - minY;
    let diffX = maxX - minX;
    let dY = yCeiling / diffY;
    let dX = xWall / diffX;
    let bufferY = (600 - yCeiling) / 2;
    let bufferX = (600 - xWall) / 2;

    this.setState({ deltaX: dX });
    this.setState({ deltaY: dY });
    this.setState({ bufferX });

    for (let group of oData) {
      for (let i = 0; i < group.length; i++) {
        if (group[i].category) {
          let yPoints = group.map((y) => {
            let yValue = Math.floor((y.value - minY) * dY);
            y["y"] = yCeiling - yValue + bufferY;
          });

          let xPoints = group.map((x) => {
            let xValue = Math.floor((Date.parse(x.date) - minX) * dX);
            x["x"] = xValue + bufferX;
          });
        }
      }
    }
  }

  //Begin line chart render methods

/*   createGrid = () => {
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    const { gridLines } = this.props;
    const { xWall } = this.props;
    let diffX = maxX - minX;
    let dX = xWall / diffX;
    //let bufferY = (600 - yCeiling) / 2;
    let bufferX = (600 - xWall) / 2;
    const beginX = (Math.floor(minX) + bufferX) * dX
    const endX = (Math.floor(maxX) - bufferX) * dX
    let spacing = (beginX - endX)/gridLines;
    const gLines = [];

    for(let gridX = beginX; gridX > endX; gridX+= spacing){
      gLines.push(gridX);
      console.log(gridX);
    }

    return null;
  } */

  drawPoints = (a) => {
    const c = a.toString();
    const regex = /([0-9]+),\s([0-9]+),\s/g;
    const cOrganized = c.replace(regex, "$1,$2 ");
    return cOrganized;
  };


render() {

    return (
      <div css={STYLES_GRAPH_CONTAINER}>
        <svg css={STYLES_GRAPH} viewBox="0 0 600 600">
          <defs>
            <linearGradient id="backgroundGradient" x1="0" y1="100%" x2="0" y2="0">
                <stop offset="0%" stop-color={Constants.system.pitchBlack} />
                <stop offset="100%" stop-color={Constants.system.slate} />
            </linearGradient>
          </defs>
          <g id="circles"></g>
          {this.state.organizedData.flat(2).map((g, index) => {
            return (
              <circle key={index} cx={g.x} cy={g.y} r="2" css={STYLES_CHART_CIRCLE} />
            );
          })}
          <g id="lines"></g>
            {this.state.organizedData.flat().map( lines => {
              let coordinates = []; 
              let i = {};
              for (let line of lines) {
                  coordinates.push(line.x);
                  coordinates.push(line.y);
                  i[`id`] = line.id;
                };
              return (
                <polyline
                css={STYLES_CHART_LINE}
                key={i.id}
                points={this.drawPoints(coordinates)}
              />
              )
              })}
          <g>
            <line css={STYLES_X_LINE} x1="25" y1="550" x2="575" y2="550" />
          </g>
          <g id="tickContainer">
          {this.state.ticks.flat().map((tick, index) => {
            const tDate = new Date(tick.date);
            const month = this.monthNames[tDate.getMonth()];
            const year = tDate.getUTCFullYear();

            return (
              <g>
              <line css={STYLES_X_LINE} x1={tick.x} y1="550" x2={tick.x} y2="560" />
              <text css={STYLES_CHART_TEXT} textAnchor="middle" x={tick.x} y="575">
                {`${month} ${year}`}
              </text>
            </g>
            )
          })}
          </g>
        </svg>
      </div>
    );
  }
}
