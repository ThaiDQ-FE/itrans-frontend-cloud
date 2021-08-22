import React, { useState } from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ModalUpdateDocument from "../modal-update-document";
import Swal from "sweetalert2";
import { getLocalStorage, localStorages } from "../../assets/helper/helper";
import {
  deleteDocument,
  updateDocument,
} from "../../store/action/round.action";
function DocumentRound() {
  const dispatch = useDispatch();
  const { listDocumentByRound } = useSelector((state) => state.introduce);
  const [id, setId] = useState({});
  const { roundAndOrganization } = useSelector((state) => state.round);
  const [editDoc, setEditDoc] = useState(false);
  const handleCloseModal = () => {
    setEditDoc(false);
    localStorage.removeItem("infoEditIntro");
  };
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmitDoc = () => {
    if (getLocalStorage("infoEditDoc") !== null) {
      const object = {
        name: values.title,
        linkResource: values.content,
      };
      object.idDocument = id;
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn chỉnh sửa tài liệu này?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateDocument(object, roundAndOrganization.idRound));
          setEditDoc(false);
        }
      });
    }
  };
  const handleEditDoc = (item) => {
    localStorages("infoEditDoc", item);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn chỉnh sửa tài liệu này?",
      text: item.title,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditDoc(true);
        setValues({
          title: item.name,
          content: item.linkResource,
        });
      } else {
        localStorage.removeItem("infoEditDoc");
      }
    });
  };
  const handleDeleteDoc = (value) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa tài liệu vừa chọn?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteDocument(value.idDocument, roundAndOrganization.idRound)
        );
      }
    });
  };
  const userInfo = getLocalStorage("userInfo");
  return (
    <>
      <ModalUpdateDocument
        closeModal={handleCloseModal}
        onSubmit={handleSubmitDoc}
        editDoc={editDoc}
        handleChangeValue={handleChangeValue}
      />
      <div className="dr__introduceWrapper">
        {listDocumentByRound.length !== 0 && (
          <div className="dr__title">Tài liệu - báo cáo</div>
        )}
        {listDocumentByRound.map((value) => (
          <div className="dr__documentWrapper">
            {userInfo.role ===  "ORGANIZATION" &&
            <div className="dr__action">
              <Tooltip title="Chỉnh sửa">
                <img
                  src={Images.PENCIL}
                  alt="edit"
                  onClick={() => {
                    handleEditDoc(value);
                    setId(value.idDocument);
                  }}
                />
              </Tooltip>
              <Tooltip title="Xóa">
                <img
                  src={Images.RED_CANCEL}
                  alt="clear"
                  onClick={() => {
                    handleDeleteDoc(value);
                    setId(value.idDocument);
                  }}
                />
              </Tooltip>
            </div>
            }
            <div>
              <a
                href={value.linkResource}
                target="_blank"
                className="dr__content"
              >
                <img
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  src={Images.DOCUMENT}
                />
                {value.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default DocumentRound;
