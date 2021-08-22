import React, { useState } from "react";
import { Table, Button, Tooltip, Input, DatePicker } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import Images from "../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRoundPendingByIdOrganization,
  updateStatusRound,
} from "../../store/action/round.action";
import moment from "moment";
import axios from "axios";
import {
  authorizationAccount,
  checkIdUser,
  convertNumber,
  countDecimals,
  showMessage,
} from "../../assets/helper/helper";
function PendingFundingRound() {
  const { listRoundPending } = useSelector((state) => state.round);
  const { loading } = useSelector((state) => state.loading);
  const [edit, setEdit] = useState(false);
  const [startDateEdit, setStartDateEdit] = useState(null);
  const [endDateEdit, setEndDateEdit] = useState(null);
  const [dataRound, setDataRound] = useState({
    soTienKeuGoi: "",
    phanTramCoPhan: "",
    moTa: "",
    ngayGoi: "",
    ngayKetThuc: "",
    id: "",
  });
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const dateFormat = "DD/MM/YYYY";
  const id = checkIdUser();
  const token = authorizationAccount();
  const checkRound = () => {
    let round;
    if (typeof listRoundPending === "string") {
      round = [];
      return round;
    } else {
      round = listRoundPending;
      return round;
    }
  };
  const handleDeleteRound = (round) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn hủy vòng gọi vốn này?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "red",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#1890ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const object = { id: round.idRound, status: "Hủy" };
        dispatch(updateStatusRound(object));
      }
    });
  };
  const handleEditRound = (round) => {
    setDataRound({
      ...dataRound,
      soTienKeuGoi: round.fundingAmount,
      phanTramCoPhan: round.shareRequirement,
      moTa: round.description,
      ngayGoi: round.startDate,
      ngayKetThuc: round.endDate,
      id: round.idRound,
    });
    setEdit(true);
  };
  const handleCancelEdit = () => {
    setEdit(false);
    setStartDateEdit(null);
    setEndDateEdit(null);
  };
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;
    setDataRound({
      ...dataRound,
      [name]: value,
    });
  };
  const putRound = (object) => {
    axios({
      method: "PUT",
      url: "https://itrans2021.herokuapp.com/api/v1/round/updateRound",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          showMessage("error", res.data);
        } else if (res.status === 200) {
          showMessage("success", "Cập nhật vòng gọi vốn thành công");
          setEdit(false);
          dispatch(getListRoundPendingByIdOrganization(id));
        }
      })
      .catch((err) => {});
  };
  const handleSaveRound = () => {
    const parseSTKG = parseInt(dataRound.soTienKeuGoi);
    const parsePTCP = parseFloat(dataRound.phanTramCoPhan);
    var formatStartDate = moment(startDateEdit).format("DD-MM-YYYY");
    var formatEndDate = moment(endDateEdit).format("DD-MM-YYYY");
    if (parseSTKG % 1 !== 0) {
      return showMessage("error", "Số tiền kêu gọi phải là số nguyên dương");
    } else if (parseSTKG < 1) {
      return showMessage("error", "Số tiền kêu gọi thấp nhất là 1 triệu VNĐ");
    } else if (parsePTCP < 0.1 || parsePTCP > 100) {
      return showMessage(
        "error",
        "Phần trăm cố phần phải nằm trong khoảng [0.1 - 100]"
      );
    } else if (countDecimals(parsePTCP) > 2) {
      return showMessage(
        "error",
        "Phần trăm cổ phần phải đúng định dạng [VD: 25.25]"
      );
    } else if (
      formatEndDate === "Invalid date" &&
      formatStartDate === "Invalid date"
    ) {
      const object = {
        fundingAmount: parseSTKG,
        shareRequirement: parsePTCP,
        description: dataRound.moTa,
        startDate: dataRound.ngayGoi,
        endDate: dataRound.ngayKetThuc,
        id: dataRound.id,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn cập nhật?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#1890ff",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          return putRound(object);
        }
      });
    } else if (
      formatStartDate !== "Invalid date" &&
      formatEndDate === "Invalid date"
    ) {
      const object = {
        fundingAmount: parseSTKG,
        shareRequirement: parsePTCP,
        description: dataRound.moTa,
        startDate: formatStartDate,
        endDate: dataRound.ngayKetThuc,
        id: dataRound.id,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn cập nhật?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#1890ff",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          return putRound(object);
        }
      });
    } else if (
      formatStartDate === "Invalid date" &&
      formatEndDate !== "Invalid date"
    ) {
      const object = {
        fundingAmount: parseSTKG,
        shareRequirement: parsePTCP,
        description: dataRound.moTa,
        startDate: dataRound.ngayGoi,
        endDate: formatEndDate,
        id: dataRound.id,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn cập nhật?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#1890ff",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          return putRound(object);
        }
      });
    } else if (
      formatStartDate !== "Invalid date" &&
      formatEndDate !== "Invalid date"
    ) {
      const object = {
        fundingAmount: parseSTKG,
        shareRequirement: parsePTCP,
        description: dataRound.moTa,
        startDate: formatStartDate,
        endDate: formatEndDate,
        id: dataRound.id,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn cập nhật?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#1890ff",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          return putRound(object);
        }
      });
    }
  };
  const columns = [
    {
      title: "Tên tổ chúc",
      dataIndex: "organization",
      key: "organization",
      width: "150px",
      render: (value, round) => (
        <div className="round__tenDoanhNghiep">
          <div className="round__thumbnail">
            <img src={round.logo} alt="logo" />
          </div>
          <p className="round__pTenDoanhNghiep">{value}</p>
        </div>
      ),
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "stage",
      key: "stage",
      width: "150px",
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      width: "160px",
      render: (value) => (
        <div className="cfr__inputStkg">
          {edit === true ? (
            <Input
              type="number"
              defaultValue={value}
              name="soTienKeuGoi"
              onChange={handleChangeEdit}
            />
          ) : (
            <>
              <span>{value > 1000 ? convertNumber(value) : value}</span>
              <Input
                className="cfr__stkgDefault"
                addonAfter=",000,000 VNĐ"
                readOnly
              />
            </>
          )}
        </div>
      ),
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "shareRequirement",
      key: "shareRequirement",
      width: "160px",
      render: (value) => (
        <div className="cfr__inputPtcp">
          {edit === true ? (
            <Input
              type="number"
              defaultValue={value}
              name="phanTramCoPhan"
              onChange={handleChangeEdit}
            />
          ) : (
            <>
              <span>{value}</span>
              <Input className="cfr__ptcpDefault" addonAfter="%" readOnly />
            </>
          )}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <>
          {edit === true ? (
            <TextArea
              rows={1}
              defaultValue={value}
              className="round__textArea"
              name="moTa"
              onChange={handleChangeEdit}
            />
          ) : (
            <Tooltip placement="top" title={value}>
              <p className="pfr__des">{value}</p>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: `${edit === true ? "150px" : "125px"}`,
      render: (value) => (
        <>
          {edit === true ? (
            <DatePicker
              defaultValue={moment(value, dateFormat)}
              format={dateFormat}
              onChange={setStartDateEdit}
              allowClear={false}
            />
          ) : (
            <div className="cfr__inputStartDate">
              <span>{value}</span>
            </div>
          )}
        </>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: `${edit === true ? "150px" : "125px"}`,
      render: (value) => (
        <>
          {edit === true ? (
            <DatePicker
              defaultValue={moment(value, dateFormat)}
              format={dateFormat}
              onChange={setEndDateEdit}
              allowClear={false}
            />
          ) : (
            <div className="cfr__inputEndDate">
              <span>{value}</span>
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      width: "50px",
      render: (value, round) => (
        <div className="round__qlvgvAction">
          {edit === false ? (
            <>
              <div className="round__edit">
                <Tooltip placement="top" title="Chỉnh sửa">
                  <img
                    src={Images.PENCIL}
                    alt="edit"
                    onClick={() => handleEditRound(round)}
                  />
                </Tooltip>
              </div>
              <div className="round__trash">
                <Tooltip placement="top" title="Xóa">
                  <img
                    src={Images.TRASH}
                    alt="trash"
                    onClick={() => handleDeleteRound(round)}
                  />
                </Tooltip>
              </div>{" "}
            </>
          ) : (
            <>
              <div className="round__save">
                <Tooltip placement="top" title="Lưu">
                  <img src={Images.SAVE} alt="save" onClick={handleSaveRound} />
                </Tooltip>
              </div>
              <div className="round__cancel">
                <Tooltip placement="top" title="Hủy">
                  <img
                    src={Images.RED_CANCEL}
                    alt="trash"
                    onClick={handleCancelEdit}
                  />
                </Tooltip>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="pfr__wrapper">
      <h3 style={{ marginBottom: 20 }}>VÒNG GỌI VỐN ĐANG CHỜ</h3>
      <div className="pfr__container">
        <Table
          loading={loading}
          className="components-table-demo-nested"
          columns={columns}
          dataSource={checkRound()}
          rowKey={(round) => round.idRound}
          pagination={false}
          bordered
          locale={{
            emptyText: <span>Không có dữ liệu</span>,
          }}
        />
      </div>
    </div>
  );
}
export default PendingFundingRound;
