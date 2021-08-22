import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { withRouter } from "react-router-dom";
import Images from "../../../assets/images/images";
import { checkEmailUser, localStorages } from "../../../assets/helper/helper";
import { postFollow, putUnfollow } from "../../../store/action/interest.action";
import Swal from "sweetalert2";
function OrganizationListComponent(props) {
  const { listOrganizationFilter } = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 9,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 9,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 9,
      });
    }
  };
  const handleClickToDetail = (gmail, id) => {
    localStorages("gmailOrganizationToDetail", gmail);
    localStorages("idOrganizationToDetail", id);
    setTimeout(() => {
      props.history.push("/to-chuc/chi-tiet");
    }, 500);
  };
  const handleClickFollow = (gmail, status, name) => {
    const object = {
      follow: checkEmailUser(),
      followed: gmail,
    };
    const objectDispath = {
      arrayIndustry: props.selectedIndustry,
      arrayProvince: props.selectedProvince,
      arrayRegion: props.selectedRegion,
      arrayStage: props.selectedStage,
    };
    if (status === "Chưa theo dõi") {
      dispatch(postFollow(object, objectDispath, null, props.history));
    } else {
      Swal.fire({
        icon: "question",
        title: "Bạn muốn hủy theo dõi nhà đầu tư " + name,
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
          dispatch(putUnfollow(object, objectDispath, props.history));
        }
      });
    }
  };

  return (
    <div
      className={`olc__wrapper${
        listOrganizationFilter.length > 0 ? "" : " olc__wrapperNormal"
      }`}
    >
      <div className="olc__container">
        <div
          className={`olc__listOrg${
            listOrganizationFilter.length > 0 ? "" : " olc__listOrgNormal"
          }`}
        >
          {listOrganizationFilter && listOrganizationFilter.length > 0 ? (
            listOrganizationFilter
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} className="olc__itemOrg">
                  <img
                    alt="logo"
                    src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                  />
                  <div
                    className="olc__name"
                    onClick={() => {
                      handleClickToDetail(
                        value.gmailOrganization,
                        value.idOrganization
                      );
                    }}
                  >
                    <span>{value.name}</span>
                  </div>
                  <div className="olc__stage">
                    <span>{value.stage}</span>
                  </div>
                  <div className="olc__industries">
                    <span>{value.industries + ""}</span>
                  </div>
                  <div className="olc__province">
                    <span>{value.province + ""}</span>
                  </div>
                  <Button
                    className={
                      value.status === "Chưa theo dõi"
                        ? "olc__follow"
                        : "olc__unFollow"
                    }
                    type="primary"
                    onClick={() =>
                      handleClickFollow(
                        value.gmailOrganization,
                        value.status,
                        value.name
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
            <div className="olc__noData">
              <img src={Images.EMPTY_BOX} alt="no data" />
              <p>Không có dữ liệu</p>
            </div>
          )}
        </div>
        <div className="olc__paging">
          {listOrganizationFilter.length > 9 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={9}
              onChange={handleChange}
              total={listOrganizationFilter.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(OrganizationListComponent);
