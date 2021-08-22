import React, { useState } from "react";
import { Select, Input, Tooltip, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import ContentNews from "../content-news";
import message from "../../../../assets/message/text";
import { storage } from "../../../../configs/firebase";
function InfoNews(props) {
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const { TextArea } = Input;
  const list = [];
  for (let i = 0; i < props.industry.length; i++) {
    list.push(
      <Option key={props.industry[i].idIndustry} value={props.industry[i].name}>
        {props.industry[i].name}
      </Option>
    );
  }
  const handleChangeThumbnail = (e) => {
    if (e.target.files[0]) {
      let media = e.target.files[0];
      if (media.type.includes("image/")) {
        if (media.name.length > 40) {
          return props.setThumbnailError("Tên hình chỉ tối đa 40 ký tự");
        } else if (media.size > 4194304) {
          return props.setThumbnailError("Kích thước hình ảnh tối đa 4MB");
        } else {
          const uploadImg = storage.ref(`images/${media.name}`).put(media);
          uploadImg.on(
            "state_changed",
            (snapshot) => {
              if (snapshot.state === "running") {
                setLoading(true);
              }
            },
            (error) => {},
            () => {
              storage
                .ref("images")
                .child(media.name)
                .getDownloadURL()
                .then((url) => {
                  setLoading(false);
                  props.setThumbnailError("");
                  props.setThumbnail(url);
                });
            }
          );
        }
      } else {
        props.setThumbnailError("Chỉ được chọn hình ảnh");
      }
    }
  };
  return (
    <div className="modal__newsInfoWrapper">
      <div className="modal__infoNewsLineOne">
        <div className="modal__inputNewsTitle">
          <label className="modal__spanWeight">Tiêu đề</label>
          <Tooltip title={props.titleError} placement="topRight" color="red">
            <Input
              className={props.titleError === "" ? "" : "modal__inputNewsError"}
              type="text"
              placeholder={message.EX_TITLE_ARTICLE}
              name="title"
              defaultValue={props.infoNews.title}
              onChange={props.handleChangeInfo}
              onBlur={props.handleBlurTitle}
            />
          </Tooltip>
        </div>
        <div className="modal__inputNewsOption">
          <label className="modal__spanWeight">Lĩnh vực</label>
          <Tooltip title={props.hashTagError} color="red" placement="topRight">
            <Select
              mode="multiple"
              className={`mino__select${
                props.hashTagError === "" ? "" : " modal__inputNewsError"
              }`}
              defaultValue={props.arrayIndus}
              placeholder={message.EX_HASHTAG_ARTICLE}
              onChange={props.handleChangeValue}
              onBlur={props.handleBlurHash}
              dropdownClassName="modal__articleDrop"
            >
              {list}
            </Select>
          </Tooltip>
        </div>
      </div>
      <div className="modal__infoNewsLineTwo">
        <div className="modal__inputNewsSummary">
          <label className="modal__spanWeight">Tóm tắt nội dung</label>
          <Tooltip title={props.sumError} color="red" placement="topRight">
            <TextArea
              className={props.sumError === "" ? "" : "modal__inputNewsError"}
              name="description"
              defaultValue={props.infoNews.description}
              onBlur={props.handleBlurSum}
              onChange={props.handleChangeInfo}
              rows={4}
              style={{ resize: "none" }}
              placeholder={message.EX_SUMMARY_ARTICLE}
            />
          </Tooltip>
        </div>
        <div className="modal__inputNewsThumbnail">
          <label className="modal__spanWeight">Ảnh</label>
          <div className="modal__inputNewsThumbnailContainer">
            <img
              src={props.thumbnail === "" ? Images.NO_IMAGE : props.thumbnail}
              alt="thumbnail"
              className="modal__inIMG"
            />
            <input
              className="modal__inFILE"
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
              <label
                htmlFor="file"
                className={`modal__inLABEL${
                  props.thumbnailError !== "" ? " modal__inLABELError" : ""
                }`}
                onChange={handleChangeThumbnail}
              >
                <img
                  src={Images.CAMERA}
                  alt="camera"
                  className="modal__inCAMERA"
                  onChange={handleChangeThumbnail}
                />
                {loading === true ? (
                  <Spin className="modal__inLABELSpin" />
                ) : (
                  <></>
                )}
              </label>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="modal__infoNewsLineThree">
        <label className="modal__spanWeight">Nội dung</label>
        <ContentNews
          loading={loading}
          handleCreate={props.handleCreate}
          content={props.content}
          setContent={props.setContent}
          handleChangeContent={props.handleChangeContent}
          open={props.open}
          openUpdate={props.openUpdate}
        />
      </div>
    </div>
  );
}

export default InfoNews;
