import React, { useState } from "react";
import "./styles.scss";
import Slider from "react-slick";
import Images from "../../assets/images/images";
import Swal from "sweetalert2";
import ModalDealDetail from "../modal-deal-detail";
import { Card, Modal, Tag, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteDealInRound,
  getDetailDeal,
  updateAcceptDeal,
  updateDealInRound,
  updateRejectDeal,
} from "../../store/action/deal.action";
import ModalUpdateDeal from "../modal-update-deal";
import { getLocalStorage, localStorages } from "../../assets/helper/helper";

function ListDealSlider() {
  const { listDealByRound } = useSelector((state) => state.round);
  const { detailDeal } = useSelector((deal) => deal.deal);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  var settings = {
    dots: true,
    slidesToShow: listDealByRound.length >= 5 ? 5 : listDealByRound.length,
    slidesToScroll: 1,
    customPaging: function (i) {
      return <p></p>;
    },
  };
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataDeal, setDataDeal] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });
  const handleChangeValueUpdate = (event) => {
    const { value, name } = event.target;
    setDataDeal({
      ...dataDeal,
      [name]: value,
    });
  };
  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    localStorage.removeItem("listDealByRound");
  };
  const [errors, setErrors] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: ""
  });
  const [color, setColor] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: ""
  });
  let check = 0;
  const validate = (values) => {
    let errors = {};
    if (!values.soTienDauTu) {
      errors.soTienDauTu = "Số tiền đầu tư không được để trống";
    } else {
      errors.soTienDauTu = "";
      check++;
    }
    if (!values.phanTramCoPhan) {
      errors.phanTramCoPhan = "Phần trăm cổ phần không được để trống";
    } else if (values.phanTramCoPhan > 100) {
      errors.phanTramCoPhan = "Phần trăm cổ phần không được lớn hơn 100%";
    } else {
      errors.phanTramCoPhan = "";
      check++;
    }
    if (!values.moTa) {
      errors.moTa = "Mô tả không được để trống";
    } else if (values.moTa.length < 50) {
      errors.moTa = "Mô tả phải lớn hơn 50 ký tự";
     }else if (values.moTa.length > 1000) {
      errors.moTa = "Mô tả phải bé hơn 1000 ký tự";
     }
    else {
      errors.moTa = "";
      check++;
    }
    return errors;
  }
  const validateColor = (values) => {
    let errors = {};
    if (!values.soTienDauTu) {
      errors.soTienDauTu = "1px solid red";
    } else {
      errors.soTienDauTu = "";
    }
    if (!values.phanTramCoPhan) {
      errors.phanTramCoPhan = "1px solid red";
    } else if (values.phanTramCoPhan > 100) {
      errors.phanTramCoPhan = "1px solid red";
    } else {
      errors.phanTramCoPhan = "";
    }
    if (!values.moTa) {
      errors.moTa = "1px solid red";
    }else if (values.moTa.length < 50) {
      errors.moTa = "1px solid red";
     }else if (values.moTa.length > 1000) {
      errors.moTa = "1px solid red";
     } else {
      errors.moTa = "";
    }
    return errors;
  }
  const handleUpdateDealForm = () => {
    if (getLocalStorage("listDealByRound") !== null) {
      const object = {
        capitalInvestment: dataDeal.soTienDauTu,
        description: dataDeal.moTa,
        idDeal: listDealByRound.idDeal,
        shareRequirement: dataDeal.phanTramCoPhan,
      };
      setErrors(validate(dataDeal));
      setColor(validateColor(dataDeal));
      if (check == 3) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chắc chắn muốn cập nhật thỏa thuận này?",
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
            dispatch(updateDealInRound(object));
            setOpenModalUpdate(false);
          }
        });
      }
    }
  };

  const handleDeletetDeal = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa thỏa thuận vừa chọn?",
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
        dispatch(deleteDealInRound(listDealByRound.idDeal));
      }
    });
  };
  const handleEditDeal = () => {
    localStorages("listDealByRound", listDealByRound);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn chỉnh sửa thỏa thuận này?",
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
        setOpenModalUpdate(true);
        setDataDeal({
          soTienDauTu: listDealByRound.capitalInvestment,
          moTa: listDealByRound.description,
          phanTramCoPhan: listDealByRound.shareRequirement,
        });
      } else {
        localStorage.removeItem("listDealByRound");
      }
    });
  };
  const handleChange = (e) => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleAccept = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn chắc chắn muốn thương lượng với thỏa thuận này?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          updateAcceptDeal(
            detailDeal.idDeal,
            detailDeal.gmail,
            detailDeal.nameInvestor
          )
        );
        setOpenModal(false);
      }
    });
  };
  const handleReject = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn không muốn thương lượng với thỏa thuận này?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          updateRejectDeal(
            detailDeal.idDeal,
            detailDeal.nameInvestor,
            detailDeal.gmail
          )
        );
        setOpenModal(false);
      }
    });
  };
  console.log(listDealByRound);
  const renderTag = (value) => {
    if (value === "ACCEPT") {
      return <Tag id="lds_accept">Đồng ý</Tag>;
    } else if (value === "PENDING") {
      return <Tag id="lds_pending">Đang chờ</Tag>;
    } else if (value === "REJECT") {
      return <Tag id="lds_reject">Từ chối</Tag>;
    } else if (value === "DONE") {
      return <Tag id="lds_done">Đã thỏa thuận</Tag>;
    } else if (value === "CANCEL") {
      return <Tag id="lds_cancel">Không thỏa thuận</Tag>;
    }
  };
  const checkDeal = () => {
    let className;
    if (listDealByRound.length === 1) {
      className = "cd__oneItem";
    } else if (listDealByRound.length === 2) {
      className = "cd__twoItem";
    } else if (listDealByRound.length === 3) {
      className = "cd__threItem";
    } else if (listDealByRound.length === 4) {
      className = "cd__fourItem";
    } else if (listDealByRound.length >= 5) {
      className = "cd__morethan";
    }
    return className;
  };
  return (
    <>
      <ModalDealDetail
        openModal={openModal}
        closeModal={handleCancel}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
      <ModalUpdateDeal
        openModalUpdate={openModalUpdate}
        closeModalUpdate={handleCloseModalUpdate}
        handleChangeValueUpdate={handleChangeValueUpdate}
        handleUpdateDealForm={handleUpdateDealForm}
        errors={errors}
        color={color}
      />
      {userInfo.role === "ORGANIZATION"
        ? listDealByRound.length !== 0 &&
        listDealByRound !== "No Data" && (
          <div className="lds__mid">
            <div className="lds__title">Nhà đầu tư muốn tham gia</div>
            <Slider {...settings} className={checkDeal()}>
              {listDealByRound.length > 0 &&
                listDealByRound.map((value) => (
                  <div
                    className="lds__container"
                    onClick={() => {
                      dispatch(getDetailDeal(value.idDeal));
                      localStorages("statusDeal", value.statusDeal);
                    }}
                  >
                    <div className="lds__listRound">
                      <Card
                        hoverable
                        className="lds__itemInves"
                        onClick={handleChange}
                      >
                        {renderTag(value.statusDeal)}
                        <img
                          style={{ objectFit: "cover" }}
                          src={value.logo}
                          alt="thumbnail"
                        />
                        <div className="lds__name">
                          <span className="span_text">
                            {" "}
                            {value.nameInvestor}
                          </span>
                        </div>
                        <div className="lds__capital">
                          <span className="span_text">Số tiền đầu tư:</span>
                          <span> {value.capitalInvestment} Tỷ (VND)</span>
                        </div>
                        <div className="lds__share">
                          <span className="span_text">
                            Phần trăm cổ phần:{" "}
                          </span>
                          <span>{value.shareRequirement} %</span>
                        </div>
                        <div className="rbii__startDate">
                          <span className="span_text">Ngày tạo: </span>
                          <span>{value.date}</span>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        )
        : listDealByRound !== "No Data" && (
          <div className="lds__dealInvs">
            <span className="lbs__title">Thông tin thỏa thuận </span>
            <div className="lds_textDeal">
              <div className="lds__introduceWrapper">
                {listDealByRound.statusDeal === "PENDING" && (
                  <div className="lds__action">
                    <Tooltip title="Chỉnh sửa">
                      <img
                        src={Images.PENCIL}
                        alt="edit"
                        onClick={() => {
                          handleEditDeal();
                        }}
                        className="lbs__edit"
                      />
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <img
                        src={Images.RED_CANCEL}
                        alt="clear"
                        onClick={() => {
                          handleDeletetDeal();
                        }}
                        className="lbs__delete"
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
              <span className="label__fontWeightV2">
                Số tiền đầu tư:{" "}
                <span className="lbs__labelNormal">
                  {listDealByRound.capitalInvestment + " Tỷ VNĐ"}
                </span>
              </span>
              <span className="label__fontWeightV2 lbs__percent">
                Phần trăm cổ phần:{" "}
                <span className="lbs__labelNormal">
                  {listDealByRound.shareRequirement + "%"}
                </span>
              </span>
              <span className="label__fontWeightV2">
                Ngày tạo:{" "}
                <span className="lbs__labelNormal">
                  {listDealByRound.date}
                </span>
              </span>
              <span className="label__fontWeightV2 lbs__des">
                Mô tả:{" "}
                <span className="lbs__labelNormal">
                  {listDealByRound.description}
                </span>
              </span>
            </div>
          </div>
        )}
    </>
  );
}
export default ListDealSlider;
