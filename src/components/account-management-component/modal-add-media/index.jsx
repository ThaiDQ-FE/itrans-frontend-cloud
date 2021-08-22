import React, { useState } from "react";
import { Button, Modal, Spin, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import { storage } from "../../../configs/firebase";
import { showMessage } from "../../../assets/helper/helper";
import configConstFirebase from "../../../assets/helper/firebase/firebase";
function ModalAddMedia(props) {
  const [loading, setLoading] = useState(false);
  const renderListMedia = () => {
    return props.listMedia.map((item, index) => {
      if (item.type === "IMAGE") {
        return (
          <li key={index} className="modal__liImage">
            <Tooltip placement="top" title="Xóa">
              <img
                className="modal__clear"
                src={Images.RED_CANCEL}
                alt="clear"
                onClick={() => {
                  props.handleDelete(index);
                }}
              />
            </Tooltip>
            <img
              className="modal__iImageRender"
              src={item.linkMedia}
              alt="images"
            />
          </li>
        );
      } else {
        return (
          <li key={index} className="modal__liImage">
            <Tooltip placement="top" title="Xóa">
              <img
                className="modal__clear"
                src={Images.RED_CANCEL}
                alt="clear"
                onClick={() => {
                  props.handleDelete(index);
                }}
              />
            </Tooltip>
            <video controls className="modal__iVideoRender">
              <source src={item.linkMedia} type="video/mp4" />
            </video>
          </li>
        );
      }
    });
  };
  const handleChangeMedia = (e) => {
    if (e.target.files[0]) {
      let media = e.target.files[0];
      if (media.type.includes("image") || media.type.includes("video")) {
        if (media.name.length > configConstFirebase.name) {
          return props.setMediaError(configConstFirebase.errorName);
        } else {
          if (media.size > configConstFirebase.size) {
            return props.setMediaError(configConstFirebase.errorSize);
          } else {
            const uploadMedia = storage.ref(`images/${media.name}`).put(media);
            uploadMedia.on(
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
                    if (url) {
                      if (media.type.includes("video/")) {
                        const object = {
                          linkMedia: url,
                          type: "VIDEO",
                        };
                        props.setListMedia([object, ...props.listMedia]);
                        props.setMediaError("");
                      } else {
                        const object = {
                          linkMedia: url,
                          type: "IMAGE",
                        };
                        props.setListMedia([object, ...props.listMedia]);
                        props.setMediaError("");
                      }
                    }
                  });
              }
            );
          }
        }
      } else {
        props.setMediaError(configConstFirebase.errorTypeMedia);
      }
    }
  };
  return (
    <Modal
      className="modal__addMedia"
      visible={props.addMoreMedia}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Thêm hình ảnh/video</h3>
      <div className="modal__iImage">
        <ul className="modal__ulImage" id="modal__iImageScroll">
          <li
            className={`modal__liImage modal__liImageAdd${
              props.mediaError !== "" ? " modal__defaultLiError" : ""
            }`}
          >
            <div className="modal__addImage">
              <input
                className="modal__file"
                type={loading === true ? "text" : "file"}
                id="file"
                accept="image/*,video/*"
                onChange={handleChangeMedia}
              />
              <Tooltip title={props.mediaError} color="red" placement="topLeft">
                <label
                  htmlFor="file"
                  className="modal__span"
                  onChange={handleChangeMedia}
                >
                  <img
                    src={Images.PLUS_ADD}
                    alt="plus"
                    className="modal__plus"
                    onChange={handleChangeMedia}
                  />
                  {loading === true ? (
                    <Spin className="modal__mediaSpin" />
                  ) : (
                    <></>
                  )}
                </label>
              </Tooltip>
            </div>
          </li>
          {renderListMedia()}
        </ul>
      </div>
      <div className="modal__addMediaAction">
        <Button
          type="primary"
          onClick={props.onSubmit}
          disabled={loading === true}
        >
          Thêm
        </Button>
      </div>
    </Modal>
  );
}

export default ModalAddMedia;
