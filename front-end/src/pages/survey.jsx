import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "../css/index.css";
import "../css/survey.css";
import { json } from "./survey-data";

var myCss = {
  "navigation": {
    "complete": "sd-btn--action sd-navigation__complete-btn",
  },
  "ranking": {
    "itemIndexEmptyMode": "sv-ranking-item__index--empty sd-ranking-item__index--empty",
    "itemIndex": "sv-ranking-item__index sd-ranking-item__index",
  },
  "body": "sv-components-column sv-components-column--expandable sd-body",
  "root": "sd-root-modern",
  "title": "sd-title",
};

function SurveyComponent() {
  const survey = new Model(json);
  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });
  survey.css = myCss;
  return <Survey model={survey} />;
}

export default SurveyComponent;

// https://surveyjs.io/form-library/documentation/get-started-react#install-the-survey-react-npm-package