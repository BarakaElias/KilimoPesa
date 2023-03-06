import React from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import { CheckCircle } from "react-feather";
import { useTranslation } from "react-i18next";

const StepLocation = () => {
  const { t } = useTranslation();
  const step = useAppSelector((state) => state.surveySlice.step);
  const Step = ({ stepNum, title }) => {
    if (step === stepNum) {
      return (
        <div className=" w-25 d-flex flex-column align-items-center">
          <div className="d-inline-block ms-3">
            <p className="stat text-center bg-success text-light fw-bolder">
              {stepNum}
            </p>
          </div>
          <h2 className="text-center step-title">{t(title)}</h2>
        </div>
      );
    }
    if (step > stepNum) {
      return (
        <div className="w-25 d-flex flex-column align-items-center">
          <div className="d-inline-block ms-3">
            <p className="p-2 text-center  text-light fw-bolder">
              <CheckCircle size={32} color="#4BBF73" />
            </p>
          </div>
          <h2 className="text-center step-title">{t(title)}</h2>
        </div>
      );
    }
    return (
      <div className="w-25 d-flex flex-column align-items-center">
        <div className="d-inline-block ms-3">
          <p className="stat text-center text-light fw-bolder">{stepNum}</p>
        </div>
        <h2 className="text-center step-title">{t(title)}</h2>
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-around">
        <Step stepNum={1} title="Personal Information" />
        <Step stepNum={2} title="Practicing" />
        <Step stepNum={3} title="Survey" />
      </div>
    </React.Fragment>
  );
};
export default StepLocation;
