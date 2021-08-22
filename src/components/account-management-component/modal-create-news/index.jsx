import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import InfoNews from "./info-news";
function ModalCreateNews(props) {
  return (
    <Modal
      className="modal__addNews"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <div className="modal__addNewsWrapper">
        <InfoNews
          open={props.open}
          openUpdate={props.openUpdate}
          infoNews={props.infoNews}
          thumbnail={props.thumbnail}
          arrayIndustries={props.arrayIndustries}
          arrayIndus={props.arrayIndus}
          setThumbnail={props.setThumbnail}
          handleChangeInfo={props.handleChangeInfo}
          handleChangeValue={props.handleChangeValue}
          industry={props.industry}
          thumbnailError={props.thumbnailError}
          titleError={props.titleError}
          sumError={props.sumError}
          setThumbnailError={props.setThumbnailError}
          handleCreate={props.handleCreate}
          handleBlurTitle={props.handleBlurTitle}
          handleBlurSum={props.handleBlurSum}
          hashTagError={props.hashTagError}
          handleBlurHash={props.handleBlurHash}
          content={props.content}
          setContent={props.setContent}
          handleChangeContent={props.handleChangeContent}
        />
      </div>
    </Modal>
  );
}

export default ModalCreateNews;
