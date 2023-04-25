import React, {useState} from "react";
import axios from "axios";
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
  const [redirecting, setRedirecting] = useState(false);
  const survey = new Model(json);
  survey.completedHtml = "Thank you for completing the survey! Go to <a href='https://8heart.zzzzion.com/home'>8heart.zzzzion.com</a> to use the app, or feel free to return to <a href='https://8heart.zzzzion.com/ranking'>8heart.zzzzion.com/ranking</a> anytime to resubmit your answers.";
  survey.onComplete.add((sender, options) => {
    const values = sender.data;
    console.log(values);
    axios.post('https://8heart.zzzzion.com/back-end/ranking/update', { loveLanguages: values["love-languages"] }, { withCredentials: true })
    .then(response => {
      console.log(response.data);
      setRedirecting(true);
    })
    .catch(error => {
      console.error(error);
    });
  });

  survey.css = myCss;
  return <Survey model={survey} />;
}

export default SurveyComponent;
