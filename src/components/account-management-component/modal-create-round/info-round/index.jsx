import React from "react";
import { Input, Tooltip, DatePicker, Spin, Popover } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import { storage } from "../../../../configs/firebase";
import configConstFirebase from "../../../../assets/helper/firebase/firebase";
function InfoInputCreateRound(props) {
  const { TextArea } = Input;
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
                    props.setThumbnail(url);
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
  const contentStart = (
    <div>
      <span>Ngày bắt đầu phải là ngày hiện tại</span>
    </div>
  );
  const contentEnd = (
    <div>
      <span>Ngày kết thúc không được trùng với ngày bắt đầu</span>
      <br />
      <span>Ngày kết thúc cách ngày bắt đầu tối đa 30 ngày</span>
    </div>
  );
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
              onChange={props.handleChangeInfoRound}
              onBlur={props.handleBlurMoney}
              style={{ textAlign: "right" }}
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
              onChange={props.handleChangeInfoRound}
              onBlur={props.handleBlurPercent}
              style={{ textAlign: "right" }}
            />
          </Tooltip>
        </div>
        <div className="modal__inputStart">
          <label className="modal__labelAddRound">
            Ngày bắt đầu
            <Popover content={contentStart} title={null}>
              {" "}
              (i)
            </Popover>
          </label>
          <Tooltip
            title={props.startDateError}
            placement="topRight"
            color="red"
          >
            <DatePicker
              dropdownClassName="round__dropdown"
              className={props.startDateError !== "" ? "error__input" : ""}
              value={props.startDate}
              onChange={props.setStartDate}
              size="middle"
              style={{ width: "100%" }}
              placeholder=""
              allowClear={false}
              format={props.dateFormat}
              onBlur={props.hanldeBlurStart}
            />
          </Tooltip>
        </div>
        <div className="modal__inputEnd">
          <label className="modal__labelAddRound">
            Ngày kết thúc
            <Popover content={contentEnd} title={null}>
              {" "}
              (i)
            </Popover>
          </label>
          <Tooltip title={props.endDateError} placement="topRight" color="red">
            <DatePicker
              dropdownClassName="round__dropdown"
              className={props.endDateError !== "" ? "error__input" : ""}
              value={props.endDate}
              onChange={props.setEndDate}
              size="middle"
              style={{ width: "100%" }}
              placeholder=""
              allowClear={false}
              format={props.dateFormat}
              onBlur={props.handleBlurEnd}
            />
          </Tooltip>
        </div>
      </div>
      <div className="modal__addRoundLineTwo">
        <div className="modal__inputSummary">
          <label className="modal__labelAddRound">Mô tả sơ lược</label>
          <Tooltip title={props.summaryError} placement="topRight" color="red">
            <TextArea
              className={props.summaryError !== "" ? "error__input" : ""}
              rows={5}
              style={{ resize: "none" }}
              name="summary"
              onChange={props.handleChangeInfoRound}
              onBlur={props.handleBlurSum}
            />
          </Tooltip>
        </div>
        <div className="modal__inputThumbnail">
          <label className="modal__labelAddRound">Ảnh</label>
          <div className="modal__inputThumbnailContainer">
            <img
              src={props.thumbnail === "" ? Images.NO_IMAGE : props.thumbnail}
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

export default InfoInputCreateRound;
