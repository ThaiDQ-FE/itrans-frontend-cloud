import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Input, Tooltip, Button, Popover, Popconfirm } from "antd";
import { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Images from "../../../../assets/images/images";
import { useDispatch } from "react-redux";
import {
  createStage,
  deleteStage,
  updateStage,
} from "../../../../store/action/admin.action";
function AMGColumnStage(props) {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dataRound, setDataRound] = useState({});
  const [name, setName] = useState("");
  const [createName, setCreateName] = useState("");
  const [data, setData] = useState({
    idStage: "",
    name: "",
  });
  const [nameError, setNameError] = useState("");
  const [editError, setEditError] = useState("");
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    let tempArray = [];
    selectedRows.map((item) => {
      let object = { idStage: item.idStage, name: item.name };
      tempArray.push(object);
    });
    setValue(tempArray);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelectionStage = {
    getCheckboxProps: (record) => {
      if (record.check === true) {
        return { disabled: true };
      }
    },
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleCreateStage = () => {
    if (createName === "") {
      return setNameError("Giai đoạn không được bỏ trống");
    } else {
      setNameError("");
    }
    if (createName.length > 50) {
      return setNameError("Độ dài tối đa 50 ký tự");
    } else {
      setNameError("");
    }
    const object = {
      name: createName,
    };
    dispatch(createStage(object));
    setCreateName("");
    setNameError("");
  };
  const handleChangeName = (event) => {
    const { value } = event.target;
    setCreateName(value);
  };
  const handleCancelCreate = () => {
    setCreateName("");
    setNameError("");
  };
  const handleDeleteStage = (round) => {
    const object = {
      idStage: round.idStage,
      name: round.name,
    };
    dispatch(deleteStage(object));
  };
  const handleDeleteStages = () => {
    value.map((item) => {
      dispatch(deleteStage(item));
    });
    setSelectedRowKeys([]);
  };
  const contentStage = (
    <div style={{ display: "flex" }}>
      <Tooltip title={nameError} placement="topRight" color="red">
        <Input
          value={createName}
          onChange={handleChangeName}
          placeholder="Giai đoạn ..."
          className={nameError !== "" ? "amgColumn__nameError" : ""}
        />
      </Tooltip>
      <Popconfirm
        title="Bạn muốn tạo giai đoạn này?"
        onConfirm={handleCreateStage}
        onCancel={handleCancelCreate}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Button type="primary" style={{ marginLeft: 10 }}>
          Tạo
        </Button>
      </Popconfirm>
    </div>
  );
  const checkSelectedRow = () => {
    if (selectedRowKeys < 1) {
      return (
        <>
          <Tooltip title="Thêm" placement="top">
            <Popover
              content={contentStage}
              trigger="hover"
              placement="bottomRight"
            >
              <PlusOutlined style={{ cursor: "pointer", color: "green" }} />
            </Popover>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <Tooltip placement="top" title="Xóa">
            <Popconfirm
              title="Bạn muốn xóa những giai đoạn đã chọn?"
              onConfirm={handleDeleteStages}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <img
                src={Images.TRASH}
                alt="delete"
                style={{
                  width: 14,
                  height: 14,
                  cursor: "pointer",
                }}
              />
            </Popconfirm>
          </Tooltip>
        </>
      );
    }
  };
  const handleChangeValue = (event) => {
    const { value } = event.target;
    setName(value);
  };
  const handleClickPencil = (round) => {
    setData({
      ...data,
      idStage: round.idStage,
      name: round.name,
    });
    setEdit(true);
    setDataRound(round);
  };
  // cancel
  const handleCancelEdit = () => {
    setEdit(false);
    setDataRound({});
  };
  // save
  const handleSaveStage = () => {
    if (name === "") {
      return setEditError("Giai đoạn không được bỏ trống");
    } else {
      setEditError("");
    }
    if (name.length > 50) {
      return setEditError("Độ dài tối đa 50 ký tự");
    } else {
      setEditError("");
    }
    const object = {
      idStage: data.idStage,
      name: name,
    };
    dispatch(updateStage(object));
    setEdit(false);
    setDataRound({});
  };
  const columnStage = [
    {
      title: "Giai đoạn",
      dataIndex: "name",
      key: "name",
      ...props.getColumnSearchProps("name"),
      render: (value, record) => (
        <div className="amgcStage__name">
          {dataRound.idStage === record.idStage ? (
            <Tooltip title={editError} color="red">
              <Input
                className={editError !== "" ? "amgColumn__errorInput" : ""}
                type="text"
                defaultValue={value}
                onChange={handleChangeValue}
              />
            </Tooltip>
          ) : (
            <Tooltip title={value}>
              <p>{value}</p>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: checkSelectedRow(),
      key: "status",
      render: (value, round) => (
        <>
          {value.check === true ? (
            <div style={{ textAlign: "center", color: "red" }}>
              <MinusOutlined />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {selectedRowKeys.length !== 0 ? (
                <></>
              ) : edit === true && dataRound.idStage === value.idStage ? (
                <>
                  <Tooltip title="Lưu">
                    <Popconfirm
                      title="Bạn muốn lưu giai đoạn vừa chỉnh sửa?"
                      onConfirm={handleSaveStage}
                      okText="Đồng ý"
                      cancelText="Hủy"
                    >
                      <img
                        src={Images.SAVE}
                        alt="save"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </Tooltip>
                  <Tooltip title="Hủy">
                    <img
                      src={Images.RED_CANCEL}
                      alt="cancel"
                      style={{
                        width: 14,
                        height: 14,
                        cursor: "pointer",
                        marginLeft: 5,
                      }}
                      onClick={handleCancelEdit}
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip placement="top" title="Sửa">
                    <img
                      src={Images.PENCIL}
                      alt="edit"
                      style={{ width: 14, height: 14, cursor: "pointer" }}
                      onClick={() => handleClickPencil(round)}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Xóa">
                    <Popconfirm
                      title="Bạn muốn xóa những giai đoạn đã chọn?"
                      onConfirm={() => handleDeleteStage(round)}
                      okText="Đồng ý"
                      cancelText="Hủy"
                    >
                      <img
                        src={Images.TRASH}
                        alt="delete"
                        style={{
                          width: 14,
                          height: 14,
                          cursor: "pointer",
                          marginLeft: 5,
                        }}
                      />
                    </Popconfirm>
                  </Tooltip>
                </>
              )}
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <Table
      bordered
      loading={props.loading}
      size="middle"
      rowSelection={{ ...rowSelectionStage }}
      columns={columnStage}
      key={columnStage.key}
      dataSource={props.stage}
      pagination={
        props.stage.length < 4
          ? false
          : {
              pageSize: 4,
              defaultPageSize: 4,
              showSizeChanger: false,
            }
      }
    />
  );
}

export default AMGColumnStage;
