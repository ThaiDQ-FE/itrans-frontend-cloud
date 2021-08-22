import React from "react";
import { Input, Tooltip, DatePicker, Spin, Popover } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import moment from "moment";
import Images from "../../../../assets/images/images";
import configConstFirebase from "../../../../assets/helper/firebase/firebase";
import { storage } from "../../../../configs/firebase";
function InfoUpdateRound(props) {
  const { TextArea } = Input;
  const content = (
    <div>
      <span>Hệ thống sẽ tự làm tròn số.</span>
      <br />
      <span>Ví dụ:</span>
      <br />
      <span>15.156 {"-->"} 15.16</span>
      <br />
      <span>0.001 {"-->"} 0.00</span>
      <br />
      <span>15. {"-->"} 15</span>
    </div>
  );

  const contentEnd = (
    <div>
      <span>Ngày kết thúc không được trùng với ngày bắt đầu</span>
      <br />
      <span>Ngày kết thúc cách ngày bắt đầu tối đa 30 ngày</span>
    </div>
  );
  const handleChangeThumbnail = (e) => {
    let thumbnail = e.target.files[0];
    if (e.target.files[0]) {
      if (thumbnail.type.includes("image/")) {
        if (thumbnail.name.length > configConstFirebase.name) {
          props.setThumbnailError(configConstFirebase.errorName);
        } else {
          if (thumbnail.size > configConstFirebase.size) {
            props.setThumbnailError(configConstFirebase.errorSize);
          } else {
            const uploadThmbnail = storage
              .ref(`images/${thumbnail.name}`)
              .put(thumbnail);
            uploadThmbnail.on(
              "state_changed",
              (snapshot) => {
                if (snapshot.state === "running") {
                  props.setLoading(true);
                }
              },
              (error) => {},
              () => {
                storage
                  .ref("images")
                  .child(thumbnail.name)
                  .getDownloadURL()
                  .then((url) => {
                    props.setLoading(false);
                    props.setThumbnailError("");
                    props.setThum(url);
                  });
              }
            );
          }
        }
      } else {
        props.setThumbnailError(configConstFirebase.errorTypeImage);
      }
    }
  };
  return (
    <>
      <div className="modal__addRoundLineOne">
        <div className="modal__inputMoney">
          <label className="modal__labelAddRound">
            Số tiền kêu gọi
            <Popover content={content} title={null}>
              {" "}
              (i)
            </Popover>
          </label>
          <Tooltip
            title={props.fundingAmountError}
            placement="topRight"
            color="red"
          >
            <Input
              className={props.fundingAmountError !== "" ? "error__input" : ""}
              type="number"
              addonAfter="Tỷ VNĐ"
              name="fundingAmount"
              onChange={props.change}
              onBlur={props.blurFund}
              style={{ textAlign: "right" }}
              defaultValue={props.info.fundingAmount}
            />
          </Tooltip>
        </div>
        <div className="modal__inputPercent">
          <label className="modal__labelAddRound">
            Phần trăm cổ phần
            <Popover content={content} title={null}>
              {" "}
              (i)
            </Popover>
          </label>
          <Tooltip
            title={props.shareRequirementError}
            placement="topRight"
            color="red"
          >
            <Input
              className={
                props.shareRequirementError !== "" ? "error__input" : ""
              }
              type="number"
              addonAfter="%"
              name="shareRequirement"
              onChange={props.change}
              onBlur={props.blurPer}
              style={{ textAlign: "right" }}
              defaultValue={props.info.shareRequirement}
            />
          </Tooltip>
        </div>
        <div className="modal__inputStart">
          <label className="modal__labelAddRound">Ngày bắt đầu</label>
          <DatePicker
            dropdownClassName="round__dropdown"
            onChange={props.setsStartDateUpdate}
            size="middle"
            style={{ width: "100%" }}
            placeholder=""
            allowClear={false}
            format={props.format}
            defaultValue={moment(props.start, props.format)}
            disabled={props.data.status === "ACTIVE"}
          />
        </div>
        <div className="modal__inputEnd">
          <label className="modal__labelAddRound">
            Ngày kết thúc
            <Popover content={contentEnd} title={null}>
              {" "}
              (i)
            </Popover>
          </label>
          <DatePicker
            dropdownClassName="round__dropdown"
            onChange={props.setEndDateUpdate}
            size="middle"
            style={{ width: "100%" }}
            placeholder=""
            allowClear={false}
            defaultValue={moment(props.end, props.format)}
            format={props.format}
          />
        </div>
      </div>
      <div className="modal__addRoundLineTwo">
        <div className="modal__inputSummary">
          <label className="modal__labelAddRound">Mô tả sơ lược</label>
          <Tooltip
            title={props.desUpdateError}
            placement="topRight"
            color="red"
          >
            <TextArea
              className={props.desUpdateError !== "" ? "error__input" : ""}
              rows={5}
              style={{ resize: "none" }}
              name="summary"
              onChange={props.change}
              onBlur={props.blurDes}
              defaultValue={props.info.summary}
            />
          </Tooltip>
        </div>
        <div className="modal__inputThumbnail">
          <label className="modal__labelAddRound">Ảnh</label>
          <div className="modal__inputThumbnailContainer">
            <img
              src={
                props.thumbnailUpdate === ""
                  ? Images.NO_IMAGE
                  : props.thumbnailUpdate
              }
              alt="user"
              className={`modal__crIMG${
                props.thumbnailError !== "" ? " modal__crIMGEror" : ""
              }`}
            />
            <input
              className="modal__crFILE"
              type="file"
              id="file"
              accept="image/*"
              onChange={handleChangeThumbnail}
            />
            <Tooltip
              title={props.thumbnailError}
              color="red"
              placement="topRight"
            >
              {props.loading === true ? (
                <Spin className="modal__crLoading" />
              ) : (
                <label
                  htmlFor="file"
                  className="modal__crLABEL"
                  onChange={handleChangeThumbnail}
                >
                  <img
                    src={Images.CAMERA}
                    alt="camera"
                    className="modal__crCAMERA"
                    onChange={handleChangeThumbnail}
                  />
                </label>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoUpdateRound;
