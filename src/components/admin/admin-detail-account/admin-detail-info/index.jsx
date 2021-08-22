import React from "react";
import { Button, Spin, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
function AdminDetailInfo(props) {
  const checkRole = props.detail.hasOwnProperty("idInvestor");
  const renderListIndus = () => {
    if (props.indus !== undefined) {
      if (props.indus.length > 0) {
        return props.indus.map((item, index) => {
          return (
            <li className="admindi__li" key={index}>
              - {item.name}
            </li>
          );
        });
      } else {
        return <>{"Chưa cập nhật"}</>;
      }
    }
  };
  const renderListPro = () => {
    if (props.pro !== undefined) {
      if (props.pro.length > 0) {
        return props.pro.map((item, index) => {
          return (
            <li className="admindi__li" key={index}>
              - {item.name}
            </li>
          );
        });
      } else {
        return <>{"Chưa cập nhật"}</>;
      }
    }
  };
  const renderListStage = () => {
    if (
      props.detail.hasOwnProperty("stages") === true &&
      props.stage.length > 0
    ) {
      return props.stage.map((item, index) => {
        return (
          <li className="admindi__li" key={index}>
            - {item.name}
          </li>
        );
      });
    } else {
      return <>{"Chưa cập nhật"}</>;
    }
  };
  const renderListRegion = () => {
    if (
      props.detail.hasOwnProperty("regions") === true &&
      props.region.length > 0
    ) {
      return props.region.map((item, index) => {
        return (
          <li className="ovic__liItem" key={index}>
            - {item.name}
          </li>
        );
      });
    } else {
      return <>{"Chưa cập nhật"}</>;
    }
  };
  const renderListInvestorType = () => {
    if (
      props.detail.hasOwnProperty("investorTypes") === true &&
      props.type.length > 0
    ) {
      return props.type.map((item, index) => {
        return (
          <li className="ovic__liItem" key={index}>
            - {item.name}
          </li>
        );
      });
    } else {
      return <>{"Chưa cập nhật"}</>;
    }
  };
  return (
    <div className="admindi__wrapper">
      <div className="admindi__displayGrid">
        {props.detail.taxCode === null ? (
          <></>
        ) : (
          <>
            <div className="admindi__item">
              <span className="admindi__fontWeight">Mã số thuế:</span>
            </div>
            <div className="admindi__item">
              <span className="admindi__wordBreak">{props.detail.taxCode}</span>
            </div>
          </>
        )}
        {checkRole === false ? (
          <>
            <div className="admindi__item">
              <span className="admindi__fontWeight">Giai đoạn hiện tại:</span>
            </div>
            <div className="admindi__item">
              <span className="admindi__wordBreak">
                {props.detail.currentStage}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="admindi__item">
              <span className="admindi__fontWeight">Trụ sở chính:</span>
            </div>
            <div className="admindi__item">
              <span className="admindi__wordBreak">
                {props.detail.headQuarter}
              </span>
            </div>
            <div className="admindi__item">
              <span className="admindi__fontWeight">Loại nhà đầu tư:</span>
            </div>
            <div className="admindi__item">
              <ul className="admindi__ul">{renderListInvestorType()}</ul>
            </div>
          </>
        )}

        <div className="admindi__item">
          <span className="admindi__fontWeight">
            {checkRole === false ? "Lĩnh vực hoạt động: " : "Lĩnh vực đầu tư: "}
          </span>
        </div>
        <div className="admindi__item">
          <ul className="admindi__ul">{renderListIndus()}</ul>
        </div>
        <div className="admindi__item">
          <span className="admindi__fontWeight">
            {checkRole === false ? "Khu vực hoạt động : " : "Khu vực đầu tư: "}
          </span>
        </div>
        <div className="admindi__item">
          <ul className="admindi__ul">{renderListPro()}</ul>
        </div>
        {checkRole === true ? (
          <>
            <div className="admindi__item">
              <span className="admindi__fontWeight">
                Giai đoạn muốn đầu tư:
              </span>
            </div>
            <div className="admindi__item">
              <ul className="admindi__ul">{renderListStage()}</ul>
            </div>
            <div className="admindi__item">
              <span className="admindi__fontWeight">Khu vực hoạt động:</span>
            </div>
            <div className="admindi__item">
              <ul className="admindi__ul">{renderListRegion()}</ul>
            </div>
            <div className="admindi__item">
              <span className="admindi__fontWeight">
                Số tiền có thể đầu tư:
              </span>
            </div>
            <div className="admindi__item">
              <span className="admindi__wordBreak">
                {props.detail.minInvestment} - {props.detail.maxInvestment} (tỷ
                VNĐ)
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AdminDetailInfo;
