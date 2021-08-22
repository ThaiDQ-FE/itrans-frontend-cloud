import React, { useState } from "react";
import { Modal, Popover } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import FormCreateRound from "./form-round";
import CertificateRound from "./list-certificate";
import InfoInputCreateRound from "./info-round";
function ModalAddRound(props) {
  const [loading, setLoading] = useState(false);
  const [loadingCer, setLoadingCer] = useState(false);
  const contentSum = (
    <div>
      <span>Mô tả kế hoạch kinh doanh(Bussiness plan)</span>
    </div>
  );
  return (
    <Modal
      className="modal__addRound"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <div className="modal__addRoundWrapper">
        <InfoInputCreateRound
          dateFormat={props.dateFormat}
          thumbnail={props.thumbnail}
          setThumbnail={props.setThumbnail}
          handleChangeInfoRound={props.handleChangeInfoRound}
          startDate={props.startDate}
          endDate={props.endDate}
          setStartDate={props.setStartDate}
          setEndDate={props.setEndDate}
          startDateError={props.startDateError}
          endDateError={props.endDateError}
          fundingAmountError={props.fundingAmountError}
          shareRequirementError={props.shareRequirementError}
          summaryError={props.summaryError}
          handleBlurMoney={props.handleBlurMoney}
          handleBlurPercent={props.handleBlurPercent}
          hanldeBlurStart={props.hanldeBlurStart}
          handleBlurEnd={props.handleBlurEnd}
          handleBlurSum={props.handleBlurSum}
          thumbnailError={props.thumbnailError}
          setThumbnailError={props.setThumbnailError}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="modal__addRoundLineThree">
          <div className="modal__labelAddRound">
            Tài liệu - Chứng chỉ (Nếu có)
          </div>
          <CertificateRound
            listCertificate={props.listCertificate}
            setListCertificate={props.setListCertificate}
            handleDelete={props.handleDelete}
            loading={loadingCer}
            setLoading={setLoadingCer}
          />
        </div>
        <div className="modal__addRoundLineFour">
          <label className="modal__labelAddRound">
            Mô tả chi tiết
            <Popover content={contentSum} title={null} placement="topLeft">
              {" "}
              (i)
            </Popover>
          </label>
          <FormCreateRound
            onSubmit={props.onSubmit}
            loading={loading}
            loadingCer={loadingCer}
            setContent={props.setContent}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddRound;
