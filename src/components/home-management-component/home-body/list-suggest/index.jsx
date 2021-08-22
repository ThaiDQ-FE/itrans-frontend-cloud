import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Tooltip, Pagination, Tag, Popover } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import { useHistory } from "react-router-dom";
import { checkRoleUser, localStorages } from "../../../../assets/helper/helper";
function RoundSuggest(props) {
  console.log(props);
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 3,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 3,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 3,
      });
    }
  };
  let history = useHistory();
  const handleClickToDetail = () => {
    history.push("/thong-tin-chi-tiet-vong-goi-von");
  };
  const content = (value) => {
    return (
      <>
        {value.stage !== null ? (
          <div className="rs__stage">
            <span className="label__fontWeight">Giai đoạn: </span>{" "}
            <Tag color="magenta">{value.stage}</Tag>
          </div>
        ) : (
          <></>
        )}
        {value.fundingAmount !== 0 ? (
          <div className="rs__fundingAmount">
            <span className="label__fontWeight">Số tiền kêu gọi: </span>
            <Tag color="green">
              {value.fundingAmount} {" Tỷ VNĐ"}
            </Tag>
          </div>
        ) : (
          <></>
        )}

        <div className="rs__indus">
          {value.industries && value.industries.length > 0 ? (
            <>
              <span className="label__fontWeight">Lĩnh vực kinh doanh: </span>{" "}
              <span>{renderListIndus(value.industries)}</span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="rs__pro">
          {value.provinces && value.provinces.length > 0 ? (
            <>
              <span className="label__fontWeight">Khu vực hoạt động: </span>{" "}
              <span>{renderListPro(value.provinces)}</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };
  const renderListPro = (item) => {
    if (item && item.length > 0) {
      return item.map((value, index) => {
        return (
          <Tag color="geekblue" key={index}>
            {value}
          </Tag>
        );
      });
    }
  };
  const renderListIndus = (item) => {
    if (item && item.length > 0) {
      return item.map((value, index) => {
        return (
          <Tag color="blue" key={index}>
            {value}
          </Tag>
        );
      });
    }
  };
  return (
    <div className="rs__wrapper">
      {checkRoleUser() === "INVESTOR" ? (
        <>
          <div className="rs__title">
            {props.list.length === 0 ? "" : "Đề xuất cho bạn"}
          </div>
          <div
            className={`rs__wrappers${
              props.list.length > 0 ? "" : " rs__wrapperNormal"
            }`}
          >
            <div className="rs__container">
              <div
                className={`rs__listRound${
                  props.list.length > 0 ? "" : " rs__listRoundNormal"
                }`}
              >
                {props.list && props.list.length > 0 ? (
                  props.list
                    .slice(length.minValue, length.maxValue)
                    .map((value, index) => (
                      <div
                        className="rs__roundV2Wrapper"
                        key={index}
                        onClick={() => {
                          handleClickToDetail();
                          localStorages("idRound", value.idRound);
                        }}
                      >
                        <Popover
                          content={() => content(value)}
                          title={null}
                          placement="rightTop"
                        >
                          <Tag className="rs__count" color="purple">
                            Phù hợp: {value.count}/4 tiêu chí
                          </Tag>
                        </Popover>
                        <div className="rs__roundSug">
                          <img
                            className="rs__thumbnail"
                            src={value.thumbnail}
                            alt="thubmnail"
                          />
                        </div>
                        <div className="rs__content">
                          <div className="rs__nameLogo">
                            <img
                              className="rs__logo"
                              src={value.logo}
                              alt="logo"
                            />
                            <div className="rs__name">
                              {value.nameOrganization}
                            </div>
                          </div>
                          {value.summaryDescription === "" ? (
                            <></>
                          ) : (
                            <div className="rs__summary">
                              <span>{value.summaryDescription}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <></>
                )}
              </div>
              <div className="olc__paging">
                {props.list.length > 3 ? (
                  <Pagination
                    style={{ textAlign: "center", marginTop: 20 }}
                    defaultCurrent={1}
                    defaultPageSize={3}
                    onChange={handleChange}
                    total={props.list.length}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RoundSuggest;
