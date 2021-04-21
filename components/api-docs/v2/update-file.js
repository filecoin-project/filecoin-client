import * as React from "react";
import * as System from "~/components/system";

import CodeBlock from "~/components/system/CodeBlock";

const EXAMPLE_CODE_JS = (key, slateId) => {
  return `const SLATE_ID = "${slateId}" 

const slateResponseData = getSlateById(SLATE_ID);

const slate = slateResponseData.slate;
const file = slate.objects[0];
file.data.name = "New filename";

const response = await fetch('https://slate.host/api/v2/update-file', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ${key}', // API key
  },
  body: JSON.stringify({ data: file })
});`;
};

const EXAMPLE_CODE_PY = (key, slateId) =>
  `import requests

headers = {
    "content-type": "application/json",
    "Authorization": "Basic ${key}", // API key
}

json = { "id": "${slateId}" } # slate ID

get_slate = requests.post(
    "https://slate.host/api/v2/get-slate", headers=headers, json=json
)

get_slate_response = get_slate.json()

slate = get_slate_response["slate"]
file = slate["objects"][0];
file["data"]["name"] = "New filename"

postJson = { "data": file }

url = "https://slate.host/api/v2/update-file"

r = requests.post(url, headers=headers, json=postJson)`;

export default class APIDocsUpdateFile extends React.Component {
  render() {
    let language = this.props.language;
    let key = this.props.APIKey;
    let slateId = this.props.slateId;

    let code = {
      javascript: EXAMPLE_CODE_JS(key, slateId),
      python: EXAMPLE_CODE_PY(key, slateId),
    };
    return (
      <React.Fragment>
        <System.DescriptionGroup
          style={{ maxWidth: 640, marginTop: 64 }}
          label="Update file"
          description="This API endpoint allows you to modify a file by saving the slate object in the response from get-slate, modifying it, and sending it back"
        />
        <CodeBlock
          children={code}
          style={{ maxWidth: "820px" }}
          language={language}
          title="Update file"
          multiLang="true"
          onLanguageChange={this.props.onLanguageChange}
        />
      </React.Fragment>
    );
  }
}