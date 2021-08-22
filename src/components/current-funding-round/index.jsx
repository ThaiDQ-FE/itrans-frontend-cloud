import React, { useState } from "react";
import { Table, Button, Tooltip, Input, DatePicker } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../assets/images/images";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  convertNumber,
  countDecimals,
  showMessage,
} from "../../assets/helper/helper";
import moment from "moment";
import {
  getListRoundActiveByIdOrganization,
  getListRoundPendingByIdOrganization,
  updateStatusRound,
} from "../../store/action/round.action";
import { getListFreeTimeActive } from "../../store/action/freeTime.action";
import ModalCreateRound from "../modal-create-round";
import axios from "axios";
import ModalAcceptDeal from "../modal-accept-deal";
import { getListDealByIdOrganization } from "../../store/action/deal.action";
import message from "../../assets/message/text";
function CurrentFundingRound() {
  const { TextArea } = Input;
  // declare dispatch
  const dispatch = useDispatch();
  // get data from store
  const { listRoundActive } = useSelector((state) => state.round);
  const { listDeal } = useSelector((state) => state.deal);
  const { loading } = useSelector((state) => state.loading);
  // declare state
  const [STKGE, setSTKGE] = useState("");
  const [PTCPE, setPTCPE] = useState("");
  const [startDateE, setStartDateE] = useState("");
  const [endDateE, setEndDateE] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [edit, setEdit] = useState(false);
  const [endDateEdit, setEndDateEdit] = useState(null);
  const [value, setValue] = useState(null);
  const [dataRound, setDataRound] = useState({
    soTienKeuGoi: "",
    phanTramCoPhan: "",
    moTa: "",
    ngayGoi: "",
    ngayKetThuc: "",
    id: "",
  });
  const [form, setForm] = useState({
    soTienKeuGoi: "",
    phanTramCoPhan: "",
    moTa: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModalAccept, setOpenModalAccept] = useState(false);
  // get data from store
  const id = checkIdUser();
  const token = authorizationAccount();
  // format date
  var formatStartDate = moment(startDate).format("DD-MM-YYYY");
  var formatEndDate = moment(endDate).format("DD-MM-YYYY");
  const dateFormat = "DD/MM/YYYY";
  // declare rule
  const arrayRule = [
    message.MODAL_ROUND_R1,
    message.MODAL_ROUND_R2,
    message.MODAL_ROUND_R3,
    message.MODAL_ROUND_R4,
    message.MODAL_ROUND_R5,
    message.MODAL_ROUND_R6,
  ];
  const renderListRule = () => {
    // eslint-disable-next-line array-callback-return
    return arrayRule.map((item) => {
      return <ul style={{ listStyleType: "upper-roman" }}>{item}</ul>;
    });
  };
  const rule = renderListRule();
  // check type of round
  const checkRound = () => {
    let round;
    if (typeof listRoundActive === "string") {
      round = [];
      return round;
    } else {
      round = [listRoundActive];
      return round;
    }
  };
  // check type of deal
  const checkDeal = () => {
    let deal;
    if (typeof listDeal === "string") {
      deal = [];
      return deal;
    } else {
      deal = listDeal;
      return deal;
    }
  };
  // call api create round
  const postRound = (
    mail,
    fundingAmount,
    shareRequirement,
    description,
    startDate,
    endDate
  ) => {
    axios({
      method: "POST",
      url: "https://itrans2021.herokuapp.com/api/v1/round",
      data: {
        mail,
        fundingAmount,
        shareRequirement,
        description,
        startDate,
        endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          showMessage("error", res.data);
        } else if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: res.data,
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#1890ff",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setOpenModal(false);
              dispatch(getListRoundActiveByIdOrganization(id));
              dispatch(getListRoundPendingByIdOrganization(id));
            }
          });
        }
      })
      .catch((err) => {});
  };
  // call api update
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
          dispatch(getListRoundActiveByIdOrganization(id));
        }
      })
      .catch((err) => {});
  };
  // call api accept deal
  const postAcceptDeal = (object) => {
    axios({
      method: "POST",
      url: "https://itrans2021.herokuapp.com/api/v1/round/accept-deal",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          showMessage("error", "Chấp nhận deal thất bại");
        } else if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: res.data,
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#2ecc71",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setOpenModalAccept(false);
              dispatch(getListDealByIdOrganization(id));
            }
          });
        }
      })
      .catch((err) => {});
  };
  // declare sub-table
  const expandedRowRender = (record, index) => {
    const columns = [
      {
        title: "Tên nhà đầu tư",
        dataIndex: "investor",
        key: "investor",
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
        title: "Số tiền muốn đầu tư",
        dataIndex: "capitalInvestment",
        key: "capitalInvestment",
        width: "180px",
        render: (value) => (
          <div className="cfr__inputStkg">
            <Input
              className="cfr__stkg"
              addonAfter=",000,000 VNĐ"
              defaultValue={value > 1000 ? convertNumber(value) : value}
              readOnly
            />
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
            <Input
              className="cfr__ptcp"
              addonAfter="%"
              defaultValue={value}
              readOnly
            />
          </div>
        ),
      },
      {
        title: "Ngày đăng",
        dataIndex: "date",
        key: "date",
        width: "180px",
        render: (value) => (
          <div className="cfr__inputStartDate">
            <Input className="cfr__input" defaultValue={value} readOnly />
          </div>
        ),
      },
      {
        title: "Ghi chú",
        dataIndex: "description",
        key: "description",
        width: "200px",
        render: (value) => (
          <Tooltip placement="top" title={value}>
            <p className="cfr__dess">{value}</p>
          </Tooltip>
        ),
      },
      {
        title: "",
        dataIndex: "status",
        key: "status",
        width: "50px",
        render: (value, round) => (
          <div className="subround__action">
            {value === "PENDING" ? (
              <>
                <div className="subround__accept">
                  <Tooltip placement="top" title="Chấp nhận">
                    <img
                      src={Images.CHECKED_REGISTER}
                      alt="chap nhan"
                      onClick={() => handleAcceptDeal(round)}
                    />
                  </Tooltip>
                </div>
                <div className="subround__reject">
                  <Tooltip placement="top" title="Từ chối">
                    <img src={Images.RED_CANCEL} alt="tu choi" />
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                <div className="subround__reject">
                  <Tooltip placement="top" title="Đã chấp nhận">
                    <img src={Images.ACCEPTED} alt="da chap nhan" />
                  </Tooltip>
                </div>
              </>
            )}
          </div>
        ),
      },
    ];
    const data = checkDeal().filter(
      (deal) =>
        deal.idRound === record.idRound &&
        deal.status !== "REJECT" &&
        deal.status !== "DELETE" &&
        deal.status !== "CANCEL"
    );
    return (
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowKey="idDeal"
        locale={{ emptyText: "Không có dữ liệu" }}
      />
    );
  };
  // accept deal
  const handleAcceptDeal = (round) => {
    dispatch(getListFreeTimeActive(round.idInvestor));
    localStorage.setItem("nameInvestor", JSON.stringify(round.investor));
    localStorage.setItem("idRound", JSON.stringify(round.idRound));
    localStorage.setItem("idDeal", JSON.stringify(round.idDeal));
    Swal.fire({
      icon: "warning",
      title: "Chấp nhận deal của nhà đầu tư " + round.investor,
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
        setOpenModalAccept(true);
      }
    });
  };
  // icon power
  const handlePowerOffRound = (round) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn kết thúc vòng gọi vốn hiện tại?",
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
        const object = { id: round.idRound, status: "Kết thúc" };
        dispatch(updateStatusRound(object));
      }
    });
  };
  // icon edit
  const handleEditRound = (round) => {
    const data = listDeal.filter(
      (deal) =>
        deal.idRound === round.idRound &&
        deal.status !== "REJECT" &&
        deal.status !== "DELETE" &&
        deal.status !== "CANCEL"
    );
    if (data.length !== 0) {
      showMessage("error", "Hiện tại không thể chỉnh sửa vòng gọi vốn!");
    } else {
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
    }
  };
  // icon trash
  const handleDeleteRound = (round) => {
    const data = listDeal.filter(
      (deal) =>
        deal.idRound === round.idRound &&
        deal.status !== "REJECT" &&
        deal.status !== "DELETE" &&
        deal.status !== "CANCEL"
    );
    if (data.length !== 0) {
      showMessage("error", "Hiện tại không thể xóa vòng gọi vốn!");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Bạn muốn hủy vòng gọi vốn hiện tại?",
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
    }
  };
  // open modal create
  const handleCreateRound = () => {
    setOpenModal(true);
  };
  // close modal create
  const handleCloseModal = () => {
    setOpenModal(false);
    setPTCPE("");
    setSTKGE("");
    setStartDateE("");
    setEndDateE("");
    setStartDate("");
    setEndDate("");
    setForm({
      soTienKeuGoi: "",
      phanTramCoPhan: "",
      moTa: "",
    });
  };

  const handleCloseModalAccept = () => {
    setOpenModalAccept(false);
    setValue(null);
    localStorage.removeItem("idRound");
    localStorage.removeItem("idDeal");
    localStorage.removeItem("nameInvestor");
  };
  const handleClickButtonModalAccept = () => {
    if (value === null) {
      return showMessage("error", "Vui lòng chọn ngày và giờ");
    } else {
      const idRound = JSON.parse(localStorage.getItem("idRound"));
      const idDeal = JSON.parse(localStorage.getItem("idDeal"));
      const object = { idDeal: idDeal, idRound: idRound, idFreeTime: value };
      return postAcceptDeal(object);
    }
  };
  const handleCreateRoundForm = (e) => {
    e.preventDefault();
    let convertInt = parseInt(form.soTienKeuGoi);
    let convertFloat = parseFloat(form.phanTramCoPhan);
    if (isNaN(convertInt)) {
      return showMessage("error", message.MODAL_STKG_NULL);
    } else if (convertInt < 1) {
      return showMessage("error", message.MODAL_STKG_AM);
    }
    if (isNaN(convertFloat)) {
      return showMessage("error", message.MODAL_PTCP_NULL);
    } else if (convertFloat < 0.1 || convertFloat > 100) {
      return showMessage("error", message.MODAL_PTCP_RANGE);
    } else if (countDecimals(convertFloat) > 2) {
      return showMessage("error", message.MODAL_PTCP_DECIMALS);
    }
    if (startDate === null || startDate === undefined || startDate === "") {
      return showMessage("error", message.MODAL_STARTDATE);
    }
    if (endDate === null || endDate === undefined || endDate === "") {
      return showMessage("error", message.MODAL_ENDDATE);
    }
    postRound(
      checkEmailUser(),
      parseInt(form.soTienKeuGoi),
      parseInt(form.phanTramCoPhan),
      form.moTa,
      formatStartDate,
      formatEndDate
    );
  };
  const handleChangeValue = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleCancelEdit = () => {
    setEdit(false);
    setEndDateEdit(null);
  };
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;
    setDataRound({
      ...dataRound,
      [name]: value,
    });
  };
  const handleSaveRound = () => {
    const parseSTKG = parseInt(dataRound.soTienKeuGoi);
    const parsePTCP = parseFloat(dataRound.phanTramCoPhan);
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
    } else if (formatEndDate === "Invalid date") {
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
    } else if (formatEndDate !== "Invalid date") {
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
    }
  };

  const columns = [
    {
      title: "Tên tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: "160px",
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
      width: "160px",
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      width: "160px",
      render: (value, round) => (
        <div className="cfr__inputStkg">
          {edit === true ? (
            <Input
              type="number"
              defaultValue={value}
              onChange={handleChangeEdit}
              name="soTienKeuGoi"
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
      width: "180px",
      render: (value) => (
        <div className="cfr__inputPtcp">
          {edit === true ? (
            <Input
              type="number"
              defaultValue={value}
              onChange={handleChangeEdit}
              name="phanTramCoPhan"
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
              onChange={handleChangeEdit}
              name="moTa"
            />
          ) : (
            <Tooltip placement="top" title={value}>
              <p className="cfr__des">{value}</p>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: "125px",
      render: (value) => (
        <div className="cfr__inputStartDate">
          <Input className="cfr__input" defaultValue={value} readOnly />
        </div>
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
              <div className="round__power">
                <Tooltip placement="top" title="Kết thúc">
                  <img
                    src={Images.POWER}
                    alt="power"
                    onClick={() => handlePowerOffRound(round)}
                  />
                </Tooltip>
              </div>
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
              </div>
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
    <div className="cfr__wrapper">
      <ModalCreateRound
        openModal={openModal}
        closeModal={handleCloseModal}
        handleChangeValue={handleChangeValue}
        STKGE={STKGE}
        PTCPE={PTCPE}
        startDate={startDate}
        setStartDate={setStartDate}
        dateFormat={dateFormat}
        startDateE={startDateE}
        endDate={endDate}
        setEndDate={setEndDate}
        endDateE={endDateE}
        rule={rule}
        handleCreateRoundForm={handleCreateRoundForm}
      />
      <ModalAcceptDeal
        openModalAccept={openModalAccept}
        closeModalAccept={handleCloseModalAccept}
        setValue={setValue}
        handleClickButtonModalAccept={handleClickButtonModalAccept}
      />
      <h3 style={{ marginBottom: 20 }}>VÒNG GỌI VỐN HIỆN TẠI</h3>
      <Button
        size="large"
        onClick={handleCreateRound}
        className="cfr__tvgv"
        type="primary"
      >
        Tạo vòng gọi vốn
      </Button>
      <div className="cfr__container">
        <Table
          loading={loading}
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={checkRound()}
          rowKey={(round) => round.idRound}
          pagination={false}
          bordered
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
}
export default CurrentFundingRound;
