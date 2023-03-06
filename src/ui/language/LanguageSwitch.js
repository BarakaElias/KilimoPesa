import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import tz from "./../../assets/img/tanzania.png";
import uk from "./../../assets/img/united-kingdom.png";
const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const changeLang = () => {
    if (i18n.language == "en") {
      i18n.changeLanguage("sw");
      window.localStorage.setItem("kilimo-lang", "sw");
    } else {
      i18n.changeLanguage("en");
      window.localStorage.setItem("kilimo-lang", "en");
    }
  };
  return (
    <div className="pe-3 pt-2 d-flex flex-row">
      <img alt="English" src={uk} />
      <Form.Check
        checked={i18n.language == "sw" ? true : false}
        name="lang"
        type="switch"
        id="language-switch"
        onChange={changeLang}
      />
      <img alt="Kiswahili" src={tz} />
    </div>
  );
};
export default LanguageSwitch;
