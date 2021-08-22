import React, { useState } from "react";
import { Card, Button, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Images from "../../../assets/images/images";
import { checkEmailUser, localStorages } from "../../../assets/helper/helper";
import { postFollow, putUnfollow } from "../../../store/action/interest.action";
import Swal from "sweetalert2";
function CardInvestorComponent(props) {
  const dispatch = useDispatch();
  const { listInvestorFilter } = useSelector((state) => state.investor);
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 12,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 12,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 12,
      });
    }
  };
  const handleClickDetail = (gmail, id, type) => {
    localStorages("gmailInvestorToDetail", gmail);
    localStorages("idInvestorToDetail", id);
    setTimeout(() => {
      props.history.push("/nha-dau-tu/chi-tiet");
    }, 500);
  };
  const handleClickFollow = (status, gmail, name) => {
    const object = {
      follow: checkEmailUser(),
      followed: gmail,
    };
    const objectDispath = {
      amount: props.amount,
      listHead: props.selectedHead,
      listIndus: props.selectedIndustry,
      listPro: props.selectedProvince,
      listStages: props.selectedStage,
      listType: props.selectedType,
    };
    if (status === "Chưa theo dõi") {
      dispatch(postFollow(object, objectDispath));
    } else {
      Swal.fire({
        icon: "question",
        title: "Bạn muốn hủy theo dõi tổ chức " + name,
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
          dispatch(putUnfollow(object, objectDispath));
        }
      });
    }
  };
  return (
    <div
      className={`il__wrapper${
        listInvestorFilter.length > 0 ? "" : " il__wrapperNormal"
      }`}
    >
      <div className="il__container">
        <div
          className={`il__listInvestor${
            listInvestorFilter.length > 0 ? "" : " il__listInvestorNormal"
          }`}
        >
          {listInvestorFilter && listInvestorFilter.length > 0 ? (
            listInvestorFilter
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} hoverable className="il__itemInvestor">
                  <img
                    alt="logo"
                    src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                  />
                  <div
                    className="il__name"
                    onClick={() => {
                      handleClickDetail(value.gmail, value.idInvestor);
                    }}
                  >
                    <span>{value.nameInvestor}</span>
                  </div>
                  <div className="il__headquarter">
                    <span>{value.headquarter}</span>
                  </div>
                  <div className="il__investorType">
                    <span>{value.investorType}</span>
                  </div>
                  <div className="il__linkWeb">
                    <span>{value.linkWebsite}</span>
                  </div>

                  <Button
                    className={
                      value.status === "Chưa theo dõi"
                        ? "il__follow"
                        : "il__unFollow"
                    }
                    type="primary"
                    onClick={() =>
                      handleClickFollow(
                        value.status,
                        value.gmail,
                        value.nameInvestor
                      )
                    }
                  >
                    {value.status === "Chưa theo dõi"
                      ? "Theo dõi"
                      : "Hủy theo dõi"}
                  </Button>
                </Card>
              ))
          ) : (
            <div className="il__noData">
              <img
                style={{ width: 75, height: 75 }}
                src={Images.EMPTY_BOX}
                alt="no data"
              />
              <p className="label__fontWeight">Không có dữ liệu</p>
            </div>
          )}
        </div>
        <div className="il__paging">
          {listInvestorFilter.length > 12 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={12}
              onChange={handleChange}
              total={listInvestorFilter.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(CardInvestorComponent);
