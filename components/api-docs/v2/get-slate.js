import * as React from "react";
import * as System from "~/components/system";

import CodeBlock from "~/components/system/CodeBlock";

const EXAMPLE_CODE_JS = (
  key,
  slateId
) => `const response = await fetch('https://slate.host/api/v2/get-slate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ${key}',
  },
  body: JSON.stringify({ data: {
    id: '${slateId}' // slate ID
  }})
});

if (!response) {
  console.log("No response");
}

const json = await response.json();
if (json.error) {
  console.log(json.error);
} else {
  const slate = json.slate;
}`;

const EXAMPLE_CODE_PY = (key, slateId) => `import requests
import json as JSON

url = 'https://slate.host/api/v2/get-slate'
headers = {
  'content-type': 'application/json',
  'Authorization': 'Basic ${key}'
}

json = {
  "data": {
    "id": "${slateId}" # slate ID
  }
}

r = requests.post(url, headers=headers, json=json)`;

export default class APIDocsGetSlate extends React.Component {
  render() {
    let APIKey = this.props.APIKey;
    let slateId = this.props.slateId;
    let language = this.props.language;

    let code = {
      javascript: EXAMPLE_CODE_JS(APIKey, slateId),
      python: EXAMPLE_CODE_PY(APIKey, slateId),
    };

    return (
      <React.Fragment>
        <System.DescriptionGroup
          style={{ maxWidth: 640, marginTop: 64 }}
          label="Get slate by ID"
          description="This API request will return a specific slate. You can save the response locally and send this JSON back to our API server using the route /api/v2/update-slate to update your slate."
        />
        <CodeBlock
          children={code}
          style={{ maxWidth: "820px" }}
          language={language}
          title="Get slate by ID"
          onLanguageChange={this.props.onLanguageChange}
          multiLang="true"
        />
      </React.Fragment>
    );
  }
}