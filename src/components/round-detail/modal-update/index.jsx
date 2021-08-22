import React, { useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Button, Modal, Popover } from "antd";
import InfoUpdateRound from "./info-update";
import ContentUpdateRound from "./content-update";
function ModalUpdateRoundV2(props) {
  const contentSum = (
    <div>
      <span>Mô tả kế hoạch kinh doanh(Bussiness plan)</span>
    </div>
  );
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      className="modal__updateRound"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <div className="modal__updateRoundWrapper">
        <InfoUpdateRound
          data={props.data}
          info={props.infoToUpdate}
          start={props.startDateUpdate}
          end={props.endDateUpdate}
          thumbnailUpdate={props.thumbnailUpdate}
          format={props.dateFormat}
          blurFund={props.handleBlurFunding}
          blurPer={props.handleBlurPer}
          blurDes={props.handleBlurDes}
          change={props.handleChangeValueUpdate}
          setThum={props.setThumbnailUpdate}
          setsStartDateUpdate={props.setsStartDateUpdate}
          setEndDateUpdate={props.setEndDateUpdate}
          setLoading={setLoading}
          loading={loading}
          //
          desUpdateError={props.desUpdateError}
          fundingAmountError={props.fundingAmountError}
          shareRequirementError={props.shareRequirementError}
          thumbnailError={props.thumbnailError}
          setDesUpdateError={props.etDesUpdateError}
          setFundingAmountError={props.setFundingAmountError}
          setShareRequirementError={props.setShareRequirementError}
          setThumbnailError={props.setThumbnailError}
        />
        <div className="modal__updateRoundContent">
          <label className="modal__labelUpdateRound">
            Mô tả chi tiết
            <Popover content={contentSum} title={null} placement="topLeft">
              {" "}
              (i)
            </Popover>
          </label>
          <ContentUpdateRound
            descriptionUpdate={props.descriptionUpdate}
            setDescriptionUpdate={props.setDescriptionUpdate}
          />
        </div>
        <div className="modal__updateButton">
          <div className="formcr__noti">
            <ul>
              <li>
                <span className="formcr__stage">Vòng gọi vốn hiện tại</span>{" "}
                không thể cập nhật ngày bắt đầu
              </li>
              <li>
                Giai đoạn gọi vốn chỉ có thể cập nhật tại mục "Chỉnh sửa thông
                tin"
              </li>
            </ul>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={props.handleClickUpdate}
            disabled={loading === true}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalUpdateRoundV2;
