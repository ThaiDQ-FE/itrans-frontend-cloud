import React, { useState } from "react";
import { useSelector } from "react-redux";
import Images from "../../../assets/images/images";
import Messages from "../../../assets/message/text";
import HeaderGeneral from "../../header-general";
import "./styles.scss";
import {
  doccumentAddClass,
  doccumentAddClassWeight,
  doccumentAddDis,
  doccumentRemoveClass,
  doccumentRemoveClassWeight,
  doccumentRemoveDis,
  localStorages,
} from "../../../assets/helper/helper";
import { Button } from "antd";
function FormRole(props) {
  const { listInvestorType } = useSelector((state) => state.register);
  localStorage.removeItem("TeamMember");
  localStorage.removeItem("Form1");
  localStorage.removeItem("VerificationCode");
  localStorage.removeItem("Form2Investor");
  const jsonFile = [
    {
      image: Images.ORGANIZATION_REGISTER,
      name: Messages.REGISTER_ORGANIZATION,
      text: Messages.REGISTER_ORGANIZATION_TEXT,
    },
    {
      image: Images.INVESTOR_REGISTER,
      name: Messages.REGISTER_INVESTOR,
      text: Messages.REGISTER_INVESTOR_TEXT,
    },
  ];
  const [click, setClick] = useState(null);
  const [choose, setChoose] = useState(null);
  const [chooseSubRole, setChooseSubRole] = useState(null);
  const [subRole, setSubRole] = useState(false);
  const [subRoleClicked, setSubRoleClicked] = useState(null);
  const [subRoleName, setSubRoleName] = useState(null);
  //

  const handleClickBlock = (index) => {
    setClick(index);
    if (index === 0) {
      setChoose("ORGANIZATION");
      document.getElementById("block1").classList.remove("fr__rotate");
      document.getElementById("block0").classList.add("formRole__active");
      document.getElementById("block1").classList.remove("formRole__active");
      setSubRole(false);
      setChooseSubRole(null);
      setSubRoleClicked(null);
      props.setArray([]);
      props.setArrayOther([]);
      doccumentRemoveClassWeight("nhadautu0");
      doccumentRemoveClassWeight("nhadautu1");
      doccumentRemoveClassWeight("nhadautu2");
      doccumentRemoveClassWeight("nhadautu3");
      doccumentRemoveClassWeight("nhadautu4");
      doccumentRemoveDis("nhadautu0");
      doccumentRemoveDis("nhadautu1");
      doccumentRemoveDis("nhadautu2");
      doccumentRemoveDis("nhadautu3");
      doccumentRemoveDis("nhadautu4");
      doccumentRemoveClass("nhadautu0");
      doccumentRemoveClass("nhadautu1");
      doccumentRemoveClass("nhadautu2");
      doccumentRemoveClass("nhadautu3");
      doccumentRemoveClass("nhadautu4");
    } else {
      setChoose("INVESTOR");
      document.getElementById("block1").classList.add("fr__rotate");
      document.getElementById("block0").classList.remove("formRole__active");
      document.getElementById("block1").classList.add("formRole__active");
      setSubRole(true);
    }
  };
  const handleClickButton = () => {
    if (choose === "INVESTOR") {
      if (chooseSubRole === null) {
      } else {
        if (chooseSubRole === "Nhà đầu tư thiên thần") {
          localStorages("investerType", props.array);
        } else {
          localStorages("investerType", props.arrayOther);
        }
        localStorages("roleName", "INVESTOR");
        return props.setStateSubRole(chooseSubRole);
      }
    } else {
      localStorages("roleName", "ORGANIZATION");
      return props.setStateRole(choose);
    }
  };
  const magicBehind = (id, name) => {
    if (props.array.length > 0) {
      doccumentAddClassWeight("nhadautu0");
      doccumentAddDis("nhadautu1");
      doccumentAddDis("nhadautu2");
      doccumentAddDis("nhadautu3");
      doccumentAddDis("nhadautu4");
      doccumentAddClass("nhadautu1");
      doccumentAddClass("nhadautu2");
      doccumentAddClass("nhadautu3");
      doccumentAddClass("nhadautu4");
      setChooseSubRole(name);
    } else {
      setChooseSubRole(null);
      doccumentRemoveClassWeight("nhadautu0");
      doccumentRemoveDis("nhadautu1");
      doccumentRemoveDis("nhadautu2");
      doccumentRemoveDis("nhadautu3");
      doccumentRemoveDis("nhadautu4");
      doccumentRemoveClass("nhadautu1");
      doccumentRemoveClass("nhadautu2");
      doccumentRemoveClass("nhadautu3");
      doccumentRemoveClass("nhadautu4");
      props.setArray([]);
    }
  };
  const magicalBehind = (index, id, name) => {
    if (props.arrayOther.length > 0) {
      const pos = props.arrayOther.indexOf(id);
      if (pos > -1) {
        doccumentAddClassWeight("nhadautu" + index);
      }
      doccumentAddDis("nhadautu0");
      doccumentAddClass("nhadautu0");
      setChooseSubRole(name);
    } else {
      setChooseSubRole(null);
      doccumentRemoveDis("nhadautu0");
      doccumentRemoveClass("nhadautu0");
    }
  };
  const handleClickSubRole = (index, name, id) => {
    if (name === "Nhà đầu tư thiên thần") {
      const pos = props.array.indexOf(id);
      if (pos > -1) {
        props.array.splice(pos, 1);
        magicBehind(id, name);
      } else {
        props.array.push(id);
        magicBehind(id, name);
      }
    } else {
      const pos = props.arrayOther.indexOf(id);
      if (pos > -1) {
        props.arrayOther.splice(pos, 1);
        doccumentRemoveClassWeight("nhadautu" + index);
        magicalBehind(index, id, name);
      } else {
        props.arrayOther.push(id);
        magicalBehind(index, id, name);
      }
    }

    setSubRoleClicked(index);
  };
  const renderSubRole = () => {
    return listInvestorType.map((sub, index) => {
      return (
        <Button
          type="primary"
          size="large"
          id={"nhadautu" + index}
          className="fr__default"
          key={index}
          onClick={() =>
            handleClickSubRole(index, sub.name, sub.idInvestorType)
          }
        >
          {sub.name}
        </Button>
      );
    });
  };
  const renderContent = () => {
    return jsonFile.map((block, index) => {
      return (
        <div
          // className={`formRole__main${
          //   click === index ? " formRole__active" : ""
          // }`}
          className="formRole__main"
          key={index}
          onClick={() => handleClickBlock(index)}
          id={"block" + index}
        >
          {click === index ? (
            <div className="formRole__check">
              <img src={Images.CHECKED_REGISTER} alt="" />
            </div>
          ) : (
            ""
          )}
          {index === 1 ? (
            <div className="fr__subRoleActive">{renderSubRole()}</div>
          ) : (
            ""
          )}
          <div className="formRole__image">
            <img src={block.image} alt="" />
          </div>
          <div className="formRole__name">
            <h2>{block.name}</h2>
          </div>
          <div className="formRole__text">
            <p>{block.text}</p>
          </div>
        </div>
      );
    });
  };
  const checkDisableButton = () => {
    let boolen;
    if (choose === null) {
      boolen = true;
    } else if (choose === "INVESTOR") {
      if (chooseSubRole === null) {
        boolen = true;
      } else {
        if (chooseSubRole === "Nhà đầu tư thiên thần") {
          if (props.array.length === 0) {
            boolen = true;
          } else {
            boolen = false;
          }
        } else {
          if (props.arrayOther.length === 0) {
            boolen = true;
          } else {
            boolen = false;
          }
        }
      }
    } else {
      boolen = false;
    }
    return boolen;
  };
  console.log(chooseSubRole);
  return (
    <div className="formRole__wrapper">
      <HeaderGeneral />
      <div className="formRole__title">
        <h2>{Messages.CHOOSE_ROLE_TEXT}</h2>
      </div>
      <div className="formRole__container">{renderContent()}</div>
      <div className="formRole__button">
        <Button
          className="formRole__Button"
          disabled={checkDisableButton()}
          type="primary"
          onClick={handleClickButton}
          size="large"
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
}
export default FormRole;
