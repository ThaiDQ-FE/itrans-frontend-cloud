import React, { useEffect, useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import HeaderGeneral from "../../../components/header-general";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FormRole from "../../../components/register-form/form-role";
import Messages from "../../../assets/message/text";
import "./styles.scss";
import FormBasicInformation from "../../../components/register-form/form-basicInfomation";
import FormInformationAboutTheOrganization from "../../../components/register-form/form-iatorganization";
import FormMember from "../../../components/register-form/form-member";
import FormAngelInvestorInformation from "../../../components/register-form/form-angelInvestor";
import FormInvestor from "../../../components/register-form/form-investor";
import { getListInvestorType } from "../../../store/action/register.action";
import { useDispatch, useSelector } from "react-redux";
function Register() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListInvestorType());
  }, []);
  const themeOrganization = createMuiTheme({
    overrides: {
      MuiStep: {
        horizontal: {
          marginTop: 25,
        },
      },
      MuiStepper: {
        root: {
          padding: "25px 250px",
          backgroundColor: "#f0f2f5",
        },
      },
      MuiStepIcon: {
        completed: {
          color: "#FF8412 !important",
        },
        active: {
          color: "#FF8412 !important",
        },
      },
      MuiSvgIcon: {
        root: {
          width: "35px !important",
          height: "35px !important",
        },
      },
      MuiStepLabel: {
        active: {
          fontWeight: "600 !important",
        },
      },
    },
  });
  const themeInvestor = createMuiTheme({
    overrides: {
      MuiStep: {
        horizontal: {
          marginTop: 25,
        },
      },
      MuiStepper: {
        root: {
          padding: "25px 350px",
          backgroundColor: "#f0f2f5",
        },
      },
      MuiStepIcon: {
        completed: {
          color: "#FF8412 !important",
        },
        active: {
          color: "#FF8412 !important",
        },
      },
      MuiSvgIcon: {
        root: {
          width: "35px !important",
          height: "35px !important",
        },
      },
      MuiStepLabel: {
        active: {
          fontWeight: "600 !important",
        },
      },
    },
  });
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [finalRole, setFinalRole] = useState(null);
  const setStateRole = (newRole) => {
    setRole(newRole);
    setFinalRole("organization");
  };
  const setStateSubRole = (newSubRole) => {
    setSubRole(newSubRole);
    setFinalRole("investor");
  };
  //
  const [array, setArray] = useState([]);
  const [arrayOther, setArrayOther] = useState([]);
  //
  const getSteps = () => {
    if (role === "ORGANIZATION") {
      return [
        Messages.GENERAL_STEP_1,
        Messages.ORGANIZATION_STEP_2,
        Messages.ORGANIZATION_STEP_3,
      ];
    } else if (subRole === "Nhà đầu tư thiên thần") {
      return [Messages.GENERAL_STEP_1, Messages.INVESTOR_INFORMATION];
    } else {
      return [
        Messages.GENERAL_STEP_1,
        Messages.INVESTOR_INFORMATION,
        Messages.ORGANIZATION_STEP_3,
      ];
    }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormBasicInformation
            handleNext={handleNext}
            handleBack={handleBack}
            step={step}
          />
        );
      case 1:
        // eslint-disable-next-line default-case
        switch (role) {
          case "ORGANIZATION":
            return (
              <FormInformationAboutTheOrganization
                handleNext={handleNext}
                handleBack={handleBack}
              />
            );
          case "":
            switch (subRole) {
              case "Nhà đầu tư thiên thần":
                return <FormAngelInvestorInformation handleBack={handleBack} />;

              default:
                return (
                  <FormInvestor
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                );
            }
        }
      // eslint-disable-next-line no-fallthrough
      case 2:
        // eslint-disable-next-line default-case
        switch (role) {
          case "ORGANIZATION":
            return (
              <FormMember handleNext={handleNext} handleBack={handleBack} />
            );
        }
      // eslint-disable-next-line no-fallthrough
      default:
        return <FormMember handleNext={handleNext} handleBack={handleBack} />;
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      {subRole === "" && role === "" ? (
        <FormRole
          setStateRole={setStateRole}
          setStateSubRole={setStateSubRole}
          array={array}
          arrayOther={arrayOther}
          setArray={setArray}
          setArrayOther={setArrayOther}
        />
      ) : (
        <MuiThemeProvider
          theme={role === "ORGANIZATION" ? themeOrganization : themeInvestor}
        >
          <div className="register__wrapper">
            <div className="register__container">
              <HeaderGeneral />
              <div className="register__form">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div className="register__body">
                  {getStepContent(activeStep)}
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      )}
    </>
  );
}
export default Register;
