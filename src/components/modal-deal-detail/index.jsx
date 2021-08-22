import React from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../assets/helper/helper";
function ModalDealDetail(props) {
  const { detailDeal } = useSelector((deal) => deal.deal);
  let tasteProvinceRegionString = "";
  if (detailDeal.tasteProvinceRegion) {
    detailDeal.tasteProvinceRegion.map((value, index) => {
      if (detailDeal.tasteProvinceRegion.length != index + 1) {
        tasteProvinceRegionString += value + ", ";
      } else {
        tasteProvinceRegionString += value;
      }
    });
  }
  const statusDeal = getLocalStorage("statusDeal");
  let investmentIndustryString = "";
  if (detailDeal.investmentIndustry) {
    detailDeal.investmentIndustry.map((value, index) => {
      if (detailDeal.investmentIndustry.length != index + 1) {
        investmentIndustryString += value + ", ";
      } else {
        investmentIndustryString += value;
      }
    });
  }

  let investmentStagesString = "";
  if (detailDeal.investmentStages) {
    detailDeal.investmentStages.map((value, index) => {
      if (detailDeal.investmentStages.length != index + 1) {
        investmentStagesString += value + ", ";
      } else {
        investmentStagesString += value;
      }
    });
  }
  let investorTypeString = "";
  if (detailDeal.investorType) {
    detailDeal.investorType.map((value, index) => {
      if (detailDeal.investorType.length != index + 1) {
        investorTypeString += value + ", ";
      } else {
        investorTypeString += value;
      }
    });
  }

  return (
    <Modal
      className="modal-deal-detail"
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      visible={props.openModal}
      onCancel={props.closeModal}
    >
      <div className="mdd__info">
        <div className="mdd__nameLogo">
          <img className="mdd__logo" src={detailDeal.logo} alt="logo" />
          <div className="mdd__name">{detailDeal.nameInvestor}</div>
        </div>
        <div className="mdd__infoBasic">
          <div className="mdd__item label__fontWeightV2">
            Loại hình nhà đầu tư:
          </div>
          <div className="mdd__item">{investorTypeString}</div>
          <div className="mdd__item label__fontWeightV2">Giai đoạn đầu tư:</div>
          <div className="mdd__item">{investmentStagesString}</div>
          <div className="mdd__item label__fontWeightV2">Số tiền đầu tư:</div>
          <div className="mdd__item">
            {detailDeal.minInvestment} -{" "}
            {detailDeal.maxInvestment + " (Tỷ VNĐ)"}
          </div>
          <div className="mdd__item label__fontWeightV2">Lĩnh vực đầu tư:</div>
          <div className="mdd__item">{investmentIndustryString}</div>
          <div className="mdd__item label__fontWeightV2">Khu vực đầu tư:</div>
          <div className="mdd__item">{tasteProvinceRegionString}</div>
        </div>
      </div>
      <div className="mdd__infoDeal">
        <span className="mdd__titleDeal">Thông tin về thỏa thuận</span>
        <div className="mdd__contentDeal">
          <div className="mdd__money">
            <span className="label__fontWeightV2">Số tiền đầu tư: </span>
            <span>{detailDeal.capitalInvestment + "   Tỷ VNĐ"}</span>
          </div>
          <div className="mdd__percent">
            <span className="label__fontWeightV2">Phần trăm cổ phần: </span>
            <span>{detailDeal.shareRequirement + "%"}</span>
          </div>
        </div>
        <div className="mdd__contentTime">
          <div className="mdd__date">
            <span className="label__fontWeightV2">Ngày bắt đầu: </span>
            <span>
              {detailDeal.hasOwnProperty("date")
                ? detailDeal.date.slice(0, 10)
                : ""}
            </span>
          </div>
          <div className="mdd__time">
            <span className="label__fontWeightV2">Thời gian: </span>
            <span>
              {detailDeal.hasOwnProperty("date")
                ? detailDeal.date.slice(11, 16)
                : ""}
            </span>
          </div>
        </div>

        <div className="mdd__des">
          <span className="label__fontWeightV2">Mô tả: </span>
          <span>{detailDeal.description}</span>
        </div>
      </div>

      {statusDeal === "PENDING" && (
        <div className="mdd__active">
          <Button
            onClick={props.handleAccept}
            className="mdd__accept"
            size="large"
            type="primary"
          >
            Chấp nhận thương lượng
          </Button>
          <Button
            onClick={props.handleReject}
            className="mdd__deny"
            size="large"
            type="primary"
          >
            Từ chối thương lượng
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default ModalDealDetail;
