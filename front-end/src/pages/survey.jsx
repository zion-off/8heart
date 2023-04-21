import React, { useCallback } from "react";
import axios from 'axios';
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "../css/index.css";
import "../css/survey.css";
import { json } from "./survey-data";

var myCss = {
  navigation: {
    complete: "sd-btn--action sd-navigation__complete-btn",
  },
  ranking: {
    itemIndexEmptyMode:
      "sv-ranking-item__index--empty sd-ranking-item__index--empty",
    itemIndex: "sv-ranking-item__index sd-ranking-item__index",
  },
  body: "sv-components-column sv-components-column--expandable sd-body",
  root: "sd-root-modern",
  title: "sd-title",
};

function SurveyComponent() {
  const survey = new Model(json);
  const saveResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    axios
      .post("/save-results", { results })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  survey.onComplete.add(saveResults);
  survey.css = myCss;
  return <Survey model={survey} />;
}

export default SurveyComponent;

// https://surveyjs.io/form-library/documentation/get-started-react#install-the-survey-react-npm-package
