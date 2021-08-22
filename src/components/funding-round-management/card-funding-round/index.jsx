import React, { useState } from "react";
import { Card, Button, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import Images from "../../../assets/images/images";
import { useHistory } from "react-router-dom";
import { localStorages } from "../../../assets/helper/helper";
function CardFundingRound() {
  const { listAllRoundV2 } = useSelector((state) => state.round);
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 9,
  });
  let history = useHistory();
  const handleClickToDetail = () => {
    history.push("/thong-tin-chi-tiet-vong-goi-von");
  };
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 9,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 9,
      });
    }
  };
  return (
    <div
      className={`cardFundingRound__wrapper${
        listAllRoundV2.length > 0 ? "" : " cardFundingRound__wrapperNormal"
      }`}
    >
      <div className="cardFundingRound__container">
        <div
          className={`cardFundingRound__listRound${
            listAllRoundV2.length > 0
              ? ""
              : " cardFundingRound__listRoundNormal"
          }`}
        >
          {listAllRoundV2 && listAllRoundV2.length > 0 ? (
            listAllRoundV2
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card
                  onClick={() => {
                    handleClickToDetail();
                    localStorages("idRound", value.idRound);
                  }}
                  key={index}
                  hoverable
                  className="cardFundingRound__itemOrg"
                >
                  {value.existDeal === false ? (
                    <></>
                  ) : (
                    <span className="cardFundingRound__had">Đã tham gia</span>
                  )}

                  <img
                    src={
                      value.thumbnail === "" ? Images.NO_IMAGE : value.thumbnail
                    }
                    alt="thumbnail"
                  />
                  <div className="cardFundingRound__name">
                    <img
                      className="cardFundingRound__nImg"
                      src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                      alt="logos"
                    />
                    <span>{value.organization}</span>
                  </div>
                  <div className="cardFundingRound__stage">
                    <span>{value.stage}</span>
                  </div>
                  <div className="cardFundingRound__date">
                    <span>{value.startDate} / </span>
                    <span>{value.endDate}</span>
                  </div>
                  {value.summary === "" ? (
                    <></>
                  ) : (
                    <div className="cardFundingRound__summary">
                      <span>{value.summary}</span>
                    </div>
                  )}
                </Card>
              ))
          ) : (
            <div className="cardFundingRound__noRound">
              <p>Không có dữ liệu</p>
              <img src={Images.NO_DATA} alt="no data" />
            </div>
          )}
        </div>
        <div className="olc__paging">
          {listAllRoundV2.length > 8 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={8}
              onChange={handleChange}
              total={listAllRoundV2.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CardFundingRound;
