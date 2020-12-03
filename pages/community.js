import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { PrismCode } from "~/components/system";

// import Prism from "prismjs";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const SLATE_CORE_TEAM = [
  {
    id: 1,
    name: "Jason Leyser",
    url: "https://github.com/jasonleyser",
    username: "jasonleyser",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreidw22xqcr6fo6m7k25qe3yemby6w4dlawbsu6yxs7qjnpu5gyoiwm",
  },
  {
    id: 2,
    name: "Cake",
    url: "https://github.com/jimmylee",
    username: "jimmylee",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreigxoyf43vw3p2hbc4ycsyh2og36cgy3s47xkb2n4w3i7auv2a6cei",
  },
  {
    id: 3,
    name: "Martina Long",
    url: "https://github.com/martinalong",
    username: "martinalong",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreiasfgunf66fxncazlfzff3vp2btfe4j55jxgb2epcthrnvwkthwrq",
  },
  {
    id: 4,
    name: "Haris Butt",
    url: "https://github.com/harisbutt",
    username: "harisbutt",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreih3tbsh6f4m3m2yv3uyc7cupriovl4b354rsyyxuh6l5sv7ftdgzq",
  },
  {
    id: 5,
    name: "Tara Lin",
    url: "https://github.com/tarafanlin",
    username: "tarafanlin",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreih4jc7scjz7ni24enb6ur32mn7eel5nax562zohrhcq2xkcegukj4",
  },
  {
    id: 6,
    name: "William Felker",
    url: "https://github.com/gndclouds",
    username: "gndclouds",
    imageUrl:
      "https://bafkreih2b33oaftlflmsg6njtu7i54f2nwws5gfhhf5w4qaezcejs6gjte.ipfs.slate.textile.io/",
  },
];

const SLATE_CONTRIBUTOR_TEAM = [
  {
    id: 1,
    name: "Pooja Shah",
    url: "https://github.com/pooja",
    username: "pooja",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreier4xffhrpconlprzxvzslqsovykqet7xj6zhhptxgu4nm2qw5i3u",
  },
  {
    id: 2,
    name: "Why",
    url: "https://github.com/whyrusleeping",
    username: "whyrusleeping",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreigvs53l22cuswtc4dtgndmc3aqns2unpc5xndnzx5gjdbw4yv6qhm",
  },
  {
    id: 9,
    name: "Carson Farmer",
    url: "https://github.com/carsonfarmer",
    username: "carsonfarmer",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/1220613?s=460&u=8048272c1509d02cdeabb6ae561bf1c697869a33&v=4",
  },
  {
    id: 4,
    name: "Aaron Stula",
    url: "https://github.com/asutula",
    username: "asutula",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreig3vnxyqqsxnrs24zpbbuc6jh5wvdsa7w6fx5gvi4j3t7rhoelhlm",
  },
  {
    id: 3,
    name: "Ignacio Hagopian",
    url: "https://github.com/jsign",
    username: "jsign",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreicktewpelagb3uvgd6psacr4kra66ii7254ghqflklek7taahni2m",
  },
  {
    id: 5,
    name: "Sander Pick",
    url: "https://github.com/sanderpick",
    username: "sanderpick",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreihptnrkusu7qnsm4qure7noknmsrhftyrx7zy6aaj4e2cxmtcey6q",
  },
  {
    id: 6,
    name: "Andrew Hill",
    url: "https://github.com/andrewxhill",
    username: "andrewxhill",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreicfbr2qpmineh2ezi2kjfbshbpizkikectbdurfskczwatjkdfcoa",
  },
  {
    id: 7,
    name: "Akuoko Daniel Jnr",
    url: "https://github.com/akuokojnr",
    username: "akuokojnr",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreiblpimmchcbvsv3xh5aimjzrjw6bmiz6yg2dtifssf2oencg5z54q",
  },
  {
    id: 8,
    name: "Narative",
    url: "https://github.com/narative",
    username: "Narative",
    imageUrl:
      "https://slate.textile.io/ipfs/bafkreihdkapriwuzfh42zkhs3kwj5qki43dvyu6mq5j3rug3uf6i7egs6y",
  },
];

const STYLES_ROOT = css`
  padding: 0 88px;
  margin: 88px auto 0 auto;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 24px 0 24px;
  }
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl5};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl4};
  }
`;

const STYLES_H2 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl4};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;
  width: 80%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.slate};
  opacity: 0.7;
  width: 80%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_SECTION_WRAPPER = css`
  max-width: 1440px;
  margin: 0 auto;
  padding: 88px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const STYLES_BUTTON = css`
  margin-top: 48px;
  min-height: 48px;
  margin-right: 12px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  background: ${Constants.system.slate};
  color: ${Constants.system.white};
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  transition: 200ms ease all;

  :hover {
    background: ${Constants.system.white};
    color: ${Constants.system.slate};
  }
`;

const STYLES_CARD_WRAPPER = css`
  width: calc(100% / 10 px);
  transition: 200ms ease box-shadow;
  padding: 36px 36px 0 0;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.1);
  }
`;

const STYLES_FULL_WIDTH = css`
  width: 100%;
`;

const STYLES_SPLIT_WIDTH = css`
  padding: 24px 0;
  width: 50%;

  :nth-child(2) {
    padding-left: 18px;
  }

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;

    :nth-child(2) {
      padding-left: 0;
    }
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;

    :nth-child(2) {
      padding-left: 0;
    }
  }
`;

const STYLES_CODE_BLOCK = css`
  box-sizing: border-box;
  font-family: ${Constants.font.code};
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  border-color: ${Constants.system.yellow};
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 24px;

  * {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0;
      height: 0;
    }
  }
`;

const STYLES_SECTION_HERO_IMG = css`
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
`;

const STYLES_SECTION_HERO = css`
  max-width: 1440px;
  margin: 0px auto 88px auto;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }
`;

const STYLES_LINE = css`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_PRE = css`
  box-sizing: border-box;
  color: #666;
  font-family: ${Constants.font.code};
  flex-shrink: 0;
  min-width: 32px;
  user-select: none;
`;

const STYLES_CODE = css`
  box-sizing: border-box;
  background-color: ${Constants.system.pitchBlack};
  font-family: ${Constants.font.code};
  color: ${Constants.system.gray};
  width: 100%;
  padding-left: 16px;
`;

const STYLES_CARD_NAME = css`
  font-size: ${Constants.typescale.lvl1};
  align-items: center;
  justify-content: center;
`;

const STYLES_CARD_GITHUB = css`
  font-size: ${Constants.typescale.lvl0};
  text-align: left;
`;

const STYLES_CARD_TEXT = css`
  padding: 16px 8px 16px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.white};
  color: ${Constants.system.black};
  border-radius: 0 0 8px 8px;

  :visted {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.black};
  }
`;

const STYLES_SLATE_CARD_EFFECTS = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: default;
  mix-blend-mode: luminosity;
  z-index: 2;
  color: ${Constants.system.black};
`;

const STYLES_FEATURE_CARD_WRAPPER = css`
  width: 33%;
  height: auto;
  padding-right: 24px;

  :nth-last-child() {
    padding-right: 0px;
  }

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }
`;

const STYLES_FEATURE_CARD = css`
  margin: 24px auto;
  padding: 16px;
  background-color: #f2f4f8;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }
`;

const STYLES_CONTRIBUTION_CARD = css`
  margin-left: 33.3%;
  width: 66.6%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${Constants.system.gray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0;
    width: 100%;
  }
`;

const STYLES_FEATURE_TEXT = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 8px 0 0 0;
  color: ${Constants.system.slate};
`;

const STYLES_CONTRIBUTION_TEXT = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 8px 0 0 0;
  color: ${Constants.system.slate};
`;

const STYLES_CONTRIBUTION_IMG = css`
  width: 40%;
  height: 40%;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.1);
`;

const STYLES_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  align-items: left;
`;

const STYLES_IMG = css`
  width: 100%;
  display: block;
  border-radius: 6px 6px 0px 0px;
`;

const STYLES_CHAT = css`
  background: #ffffff;
  margin: 48px 0px;
  padding: 32px;
  line-height: 1.5;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.1);
`;

const STYLES_HIGHLIGHT_GREEN = css`
  color: ${Constants.system.newGreen};
`;
const STYLES_HIGHLIGHT_GRAY = css`
  color: ${Constants.system.gray};
`;

const STYLES_HIGHLIGHT_YELLOW = css`
  color: ${Constants.system.newYellow};
`;

const STYLES_HIGHLIGHT_BLUE = css`
  color: ${Constants.system.newBlue};
`;

const STYLES_DOT = css`
  height: 12px;
  width: 12px;
  margin-right: 8px;
  background-color: ${Constants.system.darkGray};
  border-radius: 50%;
  display: inline-block;
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

const SlateTeamCards = (props) => {
  return (
    <div key={props.id} css={STYLES_CARD_WRAPPER}>
      <a href={props.url}>
        <System.HoverTile height={368} width={300}>
          <img
            css={STYLES_IMG}
            alt={`Github Profile Photo for ${props.handle}`}
            src={props.preview}
          />
          <div css={STYLES_CARD_TEXT}>
            <p css={STYLES_CARD_NAME}>{props.name}</p>
            <p css={STYLES_CARD_GITHUB}>{`@${props.username}`}</p>
          </div>
        </System.HoverTile>
      </a>
    </div>
  );
};

const ContributionCard = (props) => {
  return (
    <div css={STYLES_CONTRIBUTION_CARD}>
      <div css={STYLES_CONTRIBUTION_TEXT} style={{ marginRight: 8 }}>
        <span css={STYLES_DOT} />
        {props.contributor}
        <br />
        {props.contribution}
      </div>
      <img css={STYLES_CONTRIBUTION_IMG} src={props.illustration} />
    </div>
  );
};

export default class CommunityPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
  }

  render() {
    const title = `Community`;
    const description =
      "Slate is designed and built by a growing community of hackers, artists, and creatives on the web.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <div css={STYLES_SECTION_HERO}>
            <div css={STYLES_FULL_WIDTH}>
              <img
                css={STYLES_SECTION_HERO_IMG}
                src="https://slate.textile.io/ipfs/bafkreidwavbkg4kigouxvtvb6wjr2zgqxr62mkdltnujbbbq6t3ciyw6wy"
              />
              <br />
              <h1 css={STYLES_H1}>
                <span css={STYLES_HIGHLIGHT_BLUE}>An open invitation</span>
                <br />
                to everyone
              </h1>
              <p css={STYLES_P}>
                Slate is designed and built by a growing community of hackers, artists, and
                creatives on the web.
              </p>
              <button
                css={STYLES_BUTTON}
                onClick={() =>
                  window.open(
                    "https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
                  )
                }
              >
                Contribute to Slate
              </button>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_FULL_WIDTH}>
              <h2 css={STYLES_H2}>Core Team</h2>
              <p css={STYLES_P}>
                We work on Slate, and you can reach out to us about for anything you might need to
                know.
              </p>
              <div css={STYLES_CARD_GROUP}>
                {SLATE_CORE_TEAM.map((each) => (
                  <SlateTeamCards
                    key={each.name}
                    preview={each.imageUrl}
                    url={each.url}
                    name={each.name}
                    username={each.username}
                  />
                ))}
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_FULL_WIDTH}>
              <h2 css={STYLES_H2}>Contributors</h2>
              <p css={STYLES_P}>Our amazing community members helping us make Slate.</p>
              <div css={STYLES_CARD_GROUP}>
                {SLATE_CONTRIBUTOR_TEAM.map((each) => (
                  <SlateTeamCards
                    key={each.name}
                    preview={each.imageUrl}
                    url={each.url}
                    name={each.name}
                    username={each.username}
                  />
                ))}
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SPLIT_WIDTH}>
              <h2 css={STYLES_H2}>
                <span css={STYLES_HIGHLIGHT_GREEN}>Have an idea</span> for how to make Slate better?
              </h2>
              <p css={STYLES_P}>
                You can create an issue on Github or send us an email with your recommendation.
              </p>
              <div>
                <button
                  css={STYLES_BUTTON}
                  onClick={() => window.open("https://github.com/filecoin-project/slate/issues")}
                >
                  Create an issue
                </button>
                <button
                  css={STYLES_BUTTON}
                  onClick={() => window.open("https://twitter.com/_slate")}
                >
                  Tweet us
                </button>
              </div>
            </div>
            <div css={STYLES_SPLIT_WIDTH}>
              <div css={STYLES_CHAT}>
                <p>
                  Hey Bucky,
                  <br />
                  <br /> Have you thought about adding a confetti effect to the download button?
                  <br />
                  <br />
                  Best, <br />
                  Susan Weil
                  <p css={STYLES_P}>
                    Three-dimensional Painter <br /> Black Mountain College
                  </p>
                </p>
              </div>
              <div css={STYLES_CHAT}>
                <p>
                  Hey Susan
                  <br />
                  <br />
                  That would be so fun, will work in it! <br />
                  <br /> Best, <br />
                  Buckminster Fuller
                  <p css={STYLES_P}>
                    Designer, Author, Inventor <br /> Black Mountain College
                  </p>
                </p>
              </div>
            </div>
          </div>
          <div css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_SPLIT_WIDTH}>
              <h2 css={STYLES_H2}>
                <span css={STYLES_HIGHLIGHT_YELLOW}>Explore our API and SDK </span>
                and build on top of Slate.
              </h2>
              <p css={STYLES_P}>
                Checkout the examples below to see how quickly you can get up and running with
                Slate’s API.
              </p>
              <button css={STYLES_BUTTON} onClick={() => window.open("https://slate.host/system")}>
                Use Slate API
              </button>
            </div>
            <div css={STYLES_SPLIT_WIDTH}>
              <PrismCode>
                {`const response = await fetch('https://slate.host/api/v1/get', {
method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    // NOTE: your API key
    Authorization: 'Basic SLATE-API-KEY-FROM-ACCOUNT-SETTINGS',
    },
    body: JSON.stringify({ data: {
    // NOTE: optional, if you want your private slates too.
    private: false
    }})
  });
  
  const json = await response.json();
  console.log(json);`}
              </PrismCode>
            </div>
          </div>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
