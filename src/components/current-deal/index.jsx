import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Table, Input, InputNumber, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import Images from "../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentDeal,
  updateDeal,
  updateDealAccept,
  updateDealStatusCancel,
} from "../../store/action/deal.action";
import { Switch } from "antd";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import Swal from "sweetalert2";
import ModalConfirmDeal from "../modal-confirm-deal";
function CurrentDeal() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { listDealCurrent } = useSelector((state) => state.deal);
  const [idDeal, setIdDeal] = useState({
    id: "",
  });
  const [dataDeal, setDataDeal] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleCancelEdit = () => {
    setEdit(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCreateDealForm = () => {
    const dealNew = {
      idDeal: idDeal.id,
      capitalInvestment: dataDeal.soTienDauTu,
      shareRequirement: dataDeal.phanTramCoPhan,
    };
    Swal.fire({
      icon: "warning",
      title: "Deal hiện tại đã được thỏa thuận?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "gray",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#112D4E",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(updateDealAccept(dealNew));
        setOpenModal(false);
      }
    });
  };
  const handleSaveDeal = (deal) => {
    let capitalInvestmentCheck = dataDeal.soTienDauTu;
    let shareRequirementCheck = dataDeal.phanTramCoPhan;
    let descriptionCheck = dataDeal.moTa;

    if (dataDeal.soTienDauTu === "") {
      capitalInvestmentCheck = deal.capitalInvestment;
    }
    if (dataDeal.phanTramCoPhan === "") {
      shareRequirementCheck = deal.dealShareRequirement;
    }
    if (dataDeal.moTa === "") {
      descriptionCheck = deal.dealDescription;
    }
    const dealNew = {
      idDeal: deal.idDeal,
      capitalInvestment: capitalInvestmentCheck,
      shareRequirement: shareRequirementCheck,
      description: descriptionCheck,
    };
    Swal.fire({
      icon: "warning",
      title: "Bạn có chắc chỉnh sửa đúng?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "gray",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#112D4E",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(updateDeal(dealNew));
        setEdit(false);
      }
    });
  };

  const handleEditDeal = (deal) => {
    setEdit(true);
  };
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;
    setDataDeal({
      ...dataDeal,
      [name]: value,
    });
  };
  const handleAcceptDeal = (deal) => {
    setOpenModal(true);
    setIdDeal({
      ...idDeal,
      id: deal.idDeal,
    });
  };
  const handleCancelDeal = (deal) => {
    Swal.fire({
      icon: "warning",
      title: "Deal hiện tại không được thỏa thuận?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "gray",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#112D4E",
    }).then((result) => {
      if (result.isConfirmed) {
        const object = { id: deal.idDeal, status: "CANCEL" };
        dispatch(updateDealStatusCancel(object));
      }
    });
  };
  const handleDeleteDeal = (deal) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn hủy deal hiện tại?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "gray",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#112D4E",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const object = { id: deal.idDeal, status: "DELETE" };
        dispatch(updateDealStatusCancel(object));
      }
    });
  };
  const expandedRowRender = (record, index) => {
    const columns = [
      {
        title: "Tên nhà đầu tư",
        dataIndex: "nameInvestor",
        key: "nameInvestor",
        render: (value, round) => (
          <>
            <img id="src" src={round.logoInvestor} alt="&nbsp;" />
            <span>{value}</span>
          </>
        ),
      },
      {
        title: "Số tiền muốn đầu tư",
        dataIndex: "capitalInvestment",
        key: "capitalInvestment",
        render: (value, round) => (
          <div className="cfr__inputStkg">
            {edit === true ? (
              <Input
                type="number"
                defaultValue={value}
                name="soTienDauTu"
                onChange={handleChangeEdit}
              />
            ) : (
              <>
                <span>{value}</span>
                <Input
                  className="cfr__stkgDefault"
                  addonAfter=".000.000 VNĐ"
                  readOnly
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: "Phần trăm cổ phần",
        dataIndex: "dealShareRequirement",
        key: "dealShareRequirement",
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
      { title: "Ngày đăng", dataIndex: "createAt", key: "createAt" },
      {
        dataIndex: "dealDescription",
        key: "dealDescription",
        title: "Mô tả",
        render: (value) => (
          <>
            {edit === true ? (
              <TextArea
                rows={1}
                defaultValue={value}
                onChange={handleChangeEdit}
                className="deal__textArea"
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
        title: "",
        key: "action",
        render: (deal) => (
          <div className="deal__qlvgvAction">
            <If condition={deal.status === "PENDING" && edit === false}>
              <Then>
                <div className="deal__edit">
                  <Tooltip placement="top" title="Chỉnh sửa">
                    <img
                      src={Images.PENCIL}
                      onClick={() => handleEditDeal(deal)}
                      alt="edit"
                    />
                  </Tooltip>
                </div>
                <div className="deal__trash">
                  <Tooltip placement="top" title="Xóa">
                    <img
                      src={Images.TRASH}
                      alt="trash"
                      onClick={() => handleDeleteDeal(deal)}
                    />
                  </Tooltip>
                </div>
              </Then>
              <ElseIf condition={deal.status === "ACCEPT" && edit === false}>
                <>
                  <div className="deal__done">
                    <Tooltip placement="top" title="Đồng ý">
                      <img
                        src={Images.CHECKED_REGISTER}
                        alt="done"
                        onClick={() => handleAcceptDeal(deal)}
                      />
                    </Tooltip>
                  </div>
                  <div className="deal__cancel">
                    <Tooltip placement="top" title="Hủy">
                      <img
                        src={Images.RED_CANCEL}
                        onClick={() => handleCancelDeal(deal)}
                        alt="cancel"
                      />
                    </Tooltip>
                  </div>
                </>
              </ElseIf>
              <Else>
                <>
                  <div className="deal__save">
                    <Tooltip placement="top" title="Lưu">
                      <img
                        src={Images.SAVE}
                        alt="save"
                        onClick={() => handleSaveDeal(record)}
                      />
                    </Tooltip>
                  </div>
                  <div className="deal__cancel">
                    <Tooltip placement="top" title="Hủy">
                      <img
                        src={Images.RED_CANCEL}
                        onClick={() => handleCancelEdit()}
                        alt="trash"
                      />
                    </Tooltip>
                  </div>
                </>
              </Else>
            </If>
          </div>
        ),
      },
    ];
    const data = listDealCurrent.filter(
      (deal) => deal.idRound === record.idRound && deal.status !== "REJECT"
    );
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="1"
        locale={{ emptyText: "Không có dữ liệu" }}
      />
    );
  };
  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "nameOrganization",
      key: "nameOrganization",
      render: (value1, round, e) => (
        <>
          <img id="src" src={round.logoOrganization} alt="&nbsp;" />
          <span>{value1}</span>
        </>
      ),
    },
    { title: "Giai đoạn gọi vốn", dataIndex: "stage", key: "stage" },
    {
      title: "Số tiền kiêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "roundShareRequirement",
      key: "roundShareRequirement",
    },
    { title: "Mô tả", dataIndex: "roundDescription", key: "roundDescription" },
    { title: "Ngày gọi", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
  ];
  return (
    <div className="cd__wrapper">
      <h4>Deal hiện tại</h4>
      <div className="cd__container">
        <ModalConfirmDeal
          openModal={openModal}
          closeModal={handleCloseModal}
          handleChangeValue={handleChangeEdit}
          handleCreateDealForm={handleCreateDealForm}
        />
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={listDealCurrent}
          rowKey="idRound"
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
}
export default CurrentDeal;
