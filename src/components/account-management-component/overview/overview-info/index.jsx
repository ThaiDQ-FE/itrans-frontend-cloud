import React from "react";
import { Timeline, Popover, Skeleton, Button } from "antd";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import "./styles.scss";
function OverViewInfoComponent(props) {
  const checkRole = props.detail.hasOwnProperty("idInvestor");
  const renderListIndus = () => {
    if (props.indus !== undefined) {
      if (props.indus.length > 0) {
        return props.indus.map((item, index) => {
          return (
            <li className="ovic__liItem" key={index}>
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
            <li className="ovic__liItem" key={index}>
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
          <li className="ovic__liItem" key={index}>
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
      props.investorType.length > 0
    ) {
      return props.investorType.map((item, index) => {
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
    <div className="ovic__wrapper">
      <div className="ovic__container">
        <p className="ovic__thongTin">Thông tin</p>
        {props.loading === true ? (
          <Skeleton active />
        ) : (
          <>
            <div className="ovic__displayGrid">
              <div className="ovic__item">
                <span className="ovic__fontWeight">Website: </span>
              </div>
              <div className="ovic__item">
                <a href={props.detail.website} target="_blank" rel="noreferrer">
                  <span className="ovic__wordBreak">
                    {props.detail.website}
                  </span>
                </a>
              </div>
              {props.detail.taxCode === null ? (
                <></>
              ) : (
                <>
                  {" "}
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">Mã số thuế: </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__wordBreak">
                      {props.detail.taxCode}
                    </span>
                  </div>
                </>
              )}
            </div>
            <hr className="ovic__hr" />
            <div className="ovic__displayGrid">
              {checkRole === false ? (
                <>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">
                      Giai đoạn hiện tại:{" "}
                    </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__wordBreak">
                      {"- " + props.detail.currentStage}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">
                      Loại hình nhà đầu tư:{" "}
                    </span>
                  </div>
                  <div className="ovic__item">
                    <ul className="ovic__ulList ovic__wordBreak">
                      {renderListInvestorType()}
                    </ul>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">Trụ sở chính: </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__wordBreak">
                      {"- " + props.detail.headQuarter}
                    </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">Khu vực đầu tư: </span>
                  </div>
                  <div className="ovic__item">
                    <ul className="ovic__ulList ovic__wordBreak">
                      {renderListRegion()}
                    </ul>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">Giai đoạn đầu tư: </span>
                  </div>
                  <div className="ovic__item">
                    <ul className="ovic__ulList ovic__wordBreak">
                      {renderListStage()}
                    </ul>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">Số tiền đầu tư: </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__wordBreak">
                      {props.detail.minInvestment} -{props.detail.maxInvestment}{" "}
                      (tỷ VNĐ)
                    </span>
                  </div>
                </>
              )}
              <div className="ovic__item">
                <span className="ovic__fontWeight">
                  {checkRole === false
                    ? "Lĩnh vực hoạt động: "
                    : "Lĩnh vực đầu tư: "}
                </span>
              </div>
              <div className="ovic__item">
                <ul className="ovic__ulList ovic__wordBreak">
                  {renderListIndus()}
                </ul>
              </div>
              <div className="ovic__item">
                <span className="ovic__fontWeight">
                  {checkRole === false
                    ? "Khu vực hoạt động: "
                    : "Tỉnh/thành đầu tư: "}
                </span>
              </div>
              <div className="ovic__item">
                <ul className="ovic__ulList ovic__wordBreak">
                  {renderListPro()}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OverViewInfoComponent;
