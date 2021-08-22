import React, { useState } from "react";
import { Card, Button, Tooltip, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { checkRoleUser, localStorages } from "../../../../assets/helper/helper";
import Images from "../../../../assets/images/images";
import { useHistory } from "react-router-dom";
function ListInvite(props) {
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
  return (
    <div className="lin__wrapper">
      {checkRoleUser() === "INVESTOR" ? (
        <>
          <div
            className={`lin__wrappers${
              props.list.length > 0 ? "" : " lin__wrapperNormal"
            }`}
          >
            <div className="lin__background">
              <div className="lin__linkBackground"></div>
              <div className="lin__backgroundWhite"></div>
            </div>
            <div className="lin__title">
              {props.list.length === 0 ? "" : "Lời mời từ tổ chức"}
            </div>
            <div className="lin__container">
              <div
                className={`lin__listRound${
                  props.list.length > 0 ? "" : " lin__listRoundNormal"
                }`}
              >
                {props.list && props.list.length > 0 ? (
                  props.list
                    .slice(length.minValue, length.maxValue)
                    .map((value, index) => (
                      <div
                        className="lin__roundV2Wrapper"
                        key={index}
                        onClick={() => {
                          handleClickToDetail();
                          localStorages("idRound", value.idRound);
                        }}
                      >
                        <div className="lin__roundSug">
                          <img
                            className="lin__thumbnail"
                            src={value.thumbnail}
                            alt="thubmnail"
                          />
                        </div>
                        <div className="lin__content">
                          <div className="lin__nameLogo">
                            <img
                              className="lin__logo"
                              src={value.logo}
                              alt="logo"
                            />
                            <div className="lin__name">
                              {value.organizationName}
                            </div>
                          </div>
                          {value.description === "" ? (
                            <></>
                          ) : (
                            <div className="lin__summary">
                              <span>{value.description}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <></>
                )}
              </div>
              <div className="lin__paging">
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

export default ListInvite;
