import React from "react";
import { Timeline, Popover, Skeleton, Button } from "antd";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import "./styles.scss";
function OverViewInfoViewComponent(props) {
  const checkRole = props.detailView.hasOwnProperty("idInvestor");
  const renderListIndus = () => {
    if (props.indusView !== undefined) {
      if (props.indusView.length > 0) {
        return props.indusView.map((item, index) => {
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
    if (props.proView !== undefined) {
      if (props.proView.length > 0) {
        return props.proView.map((item, index) => {
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
      props.detailView.hasOwnProperty("stages") === true &&
      props.stageView.length > 0
    ) {
      return props.stageView.map((item, index) => {
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
      props.detailView.hasOwnProperty("regions") === true &&
      props.regionView.length > 0
    ) {
      return props.regionView.map((item, index) => {
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
      props.detailView.hasOwnProperty("investorTypes") === true &&
      props.investorTypeView.length > 0
    ) {
      return props.investorTypeView.map((item, index) => {
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
                <a
                  href={props.detailView.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="ovic__wordBreak">
                    {props.detailView.website}
                  </span>
                </a>
              </div>
              {props.detailView.taxCode === null ? (
                <></>
              ) : (
                <>
                  {" "}
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">Mã số thuế: </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__wordBreak">
                      {props.detailView.taxCode}
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
                      {"- " + props.detailView.currentStage}
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
                      {"- " + props.detailView.headQuarter}
                    </span>
                  </div>
                  <div className="ovic__item">
                    <span className="ovic__fontWeight">
                      Khu vực hoạt động:{" "}
                    </span>
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
                      {props.detailView.minInvestment} -
                      {props.detailView.maxInvestment} (Tỷ VNĐ)
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
                    : "Khu vực đầu tư: "}
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

export default OverViewInfoViewComponent;
