import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import CodeBlock from "~/components/system/CodeBlock";

import { css } from "@emotion/react";

const EXAMPLE_CODE_JS = (key) => `const response = await fetch('https://slate.host/api/v1/get', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ${key}',
  },
  body: JSON.stringify({ data: {
    private: false
  }})
});

const json = await response.json();
console.log(json);`;

const EXAMPLE_CODE_PY = (key) => `import requests
import json as JSON

url = "https://slate.host/api/v1/get"
headers = {
    "content-type": "application/json",
    "Authorization": "Basic ${key}",
}

json = {"private": "false"}

r = requests.post(url, headers=headers, json=json)

print(JSON.dumps(r.json(), indent=2))`;

export default class APIDocsGet extends React.Component {
  render() {
    let APIKey = this.props.APIKey;
    let language = this.props.language;

    let code = {
      javascript: EXAMPLE_CODE_JS(APIKey),
      python: EXAMPLE_CODE_PY(APIKey),
    };

    return (
      <React.Fragment>
        <System.DescriptionGroup
          style={{ maxWidth: 640, marginTop: 64 }}
          label="Get all slates"
          description="This API request returns all of your slates, and can optionally return your private slates as well. If the request body is omitted, the request will return only your public slates by default."
        />
        <CodeBlock
          children={code}
          language={language}
          style={{ maxWidth: "820px" }}
          title="Get all slates"
          multiLang="true"
          onLanguageChange={this.props.onLanguageChange}
        />
      </React.Fragment>
    );
  }
}