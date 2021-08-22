import { Spin, Tooltip } from "antd";
import React from "react";
import configConstFirebase from "../../../../assets/helper/firebase/firebase";
import { showMessage } from "../../../../assets/helper/helper";
import Images from "../../../../assets/images/images";
import { storage } from "../../../../configs/firebase";
import "./styles.scss";
function CertificateRound(props) {
  const handleChangeFile = (e) => {
    let fileD = e.target.files[0];
    if (fileD) {
      if (
        fileD.type.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) ||
        fileD.type.includes("application/pdf") ||
        fileD.type.includes(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) ||
        fileD.type.includes(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) ||
        fileD.type.includes("image/")
      ) {
        if (fileD.name.length > configConstFirebase.name) {
          showMessage("warning", configConstFirebase.errorName);
        } else {
          if (fileD.size > configConstFirebase.size) {
            showMessage("warning", configConstFirebase.errorSize);
          } else {
            const uploadFile = storage.ref(`images/${fileD.name}`).put(fileD);
            uploadFile.on(
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
                  .child(fileD.name)
                  .getDownloadURL()
                  .then((url) => {
                    const object = {
                      name: fileD.name,
                      linkResource: url,
                    };
                    props.setLoading(false);
                    props.setListCertificate([
                      object,
                      ...props.listCertificate,
                    ]);
                  });
              }
            );
          }
        }
      } else {
        showMessage("warning", "Vui lòng chọn PDF, WORD,EXCEL,PPT");
      }
    }
  };
  const renderListCertificate = () => {
    return props.listCertificate.map((item, index) => {
      return (
        <li key={index} className="modal__certificateLi">
          {props.loading === true ? (
            <></>
          ) : (
            <img
              className="modal__certificateLiX"
              src={Images.RED_CANCEL}
              alt="delete"
              onClick={() => {
                props.handleDelete(index);
              }}
            />
          )}

          <Tooltip title={item.name} placement="topRight">
            <a
              className="modal__cerA"
              href={item.linkResource}
              target="_blank"
              rel="noreferrer"
            >
              {item.name}
            </a>
          </Tooltip>
        </li>
      );
    });
  };
  const scrollContainer = document.getElementById("modal__cerScroll");
  if (scrollContainer) {
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }
  return (
    <div className="modal__certificateWrapper">
      <div className="modal__certificateContainer">
        <ul className="modal__certificateUl" id="modal__cerScroll">
          <li className="modal__certificateLi modal__certificateLiAdd">
            <div className="modal__addCertificate">
              <input
                className="modal__addFile"
                type="file"
                id="files"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={handleChangeFile}
              />
              {props.loading === true ? (
                <Spin className="modal__cerLoading" />
              ) : (
                <label
                  htmlFor="files"
                  className="modal__addLabel"
                  onChange={handleChangeFile}
                >
                  <img
                    src={Images.PLUS_ADD}
                    alt="plus"
                    className="modal__addPlus"
                    onChange={handleChangeFile}
                  />
                </label>
              )}
            </div>
          </li>
          {renderListCertificate()}
        </ul>
      </div>
    </div>
  );
}

export default CertificateRound;
