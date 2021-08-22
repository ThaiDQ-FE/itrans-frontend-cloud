import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Input, Tooltip, Button, Popover, Popconfirm } from "antd";
import { useState } from "react";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Images from "../../../../assets/images/images";
import { useDispatch } from "react-redux";
import {
  createIndustry,
  deleteIndustry,
  updateIndustry,
} from "../../../../store/action/admin.action";
function AMGColumnIndustry(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dataRound, setDataRound] = useState({});
  const [name, setName] = useState("");
  const [createName, setCreateName] = useState("");
  const [data, setData] = useState({
    idIndustry: "",
    name: "",
  });
  const [nameError, setNameError] = useState("");
  const [editError, setEditError] = useState("");
  const [selectedRowKeysIndustry, setSelectedRowKeysIndustry] = useState([]);
  const onSelectChangeIndustry = (selectedRowKeys, selectedRows) => {
    let tempArray = [];
    selectedRows.map((item) => {
      let object = { idIndustry: item.idIndustry, name: item.name };
      tempArray.push(object);
    });
    setValue(tempArray);
    setSelectedRowKeysIndustry(selectedRowKeys);
  };
  const rowSelectionIndustry = {
    getCheckboxProps: (record) => {
      if (record.check === true) {
        return { disabled: true };
      }
    },
    selectedRowKeysIndustry,
    onChange: onSelectChangeIndustry,
  };
  const handleChangeName = (event) => {
    const { value } = event.target;
    setCreateName(value);
  };
  const handleCancelCreate = () => {
    setCreateName("");
    setNameError("");
  };
  const handleCreateIndustry = () => {
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
    dispatch(createIndustry(object));
    setCreateName("");
    setNameError("");
  };
  const contentIndustry = (
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
        title="Bạn muốn tạo ngành nghề này?"
        onConfirm={handleCreateIndustry}
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
  const handleDeleteIndustries = () => {
    value.map((item) => {
      dispatch(deleteIndustry(item));
    });
    setSelectedRowKeysIndustry([]);
  };

  const checkSelectedRowIndustry = () => {
    if (selectedRowKeysIndustry < 1) {
      return (
        <>
          <Tooltip title="Thêm" placement="top">
            <Popover
              content={contentIndustry}
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
              title="Bạn muốn xóa những ngành nghề đã chọn?"
              onConfirm={handleDeleteIndustries}
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
  const handleSaveIndustry = () => {
    if (name === "") {
      return setEditError("Ngành nghề không được bỏ trống");
    } else {
      setEditError("");
    }
    if (name.length > 50) {
      return setEditError("Độ dài tối đa 50 ký tự");
    } else {
      setEditError("");
    }
    const object = {
      idIndustry: data.idIndustry,
      name: name,
    };
    dispatch(updateIndustry(object));
    setEdit(false);
    setDataRound({});
  };
  const handleCancelEdit = () => {
    setEdit(false);
    setDataRound({});
  };
  const handleClickPencil = (round) => {
    setData({
      ...data,
      idIndustry: round.idIndustry,
      name: round.name,
    });
    setEdit(true);
    setDataRound(round);
  };
  const handleDeleteIndustry = (round) => {
    const object = {
      idIndustry: round.idIndustry,
      name: round.name,
    };
    dispatch(deleteIndustry(object));
  };
  const columnIndustry = [
    {
      title: "Ngành nghề",
      dataIndex: "name",
      key: "name",
      ...props.getColumnSearchProps("name"),
      render: (value, record) => (
        <div className="amgcIndustry__name">
          {dataRound.idIndustry === record.idIndustry ? (
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
      title: checkSelectedRowIndustry(),
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
              {selectedRowKeysIndustry.length !== 0 ? (
                <></>
              ) : edit === true && dataRound.idIndustry === value.idIndustry ? (
                <>
                  <Tooltip title="Lưu">
                    <Popconfirm
                      title="Bạn muốn lưu ngành nghề vừa chỉnh sửa?"
                      onConfirm={handleSaveIndustry}
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
                      title="Bạn muốn xóa những ngành nghề đã chọn?"
                      onConfirm={() => handleDeleteIndustry(round)}
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
      rowSelection={{ ...rowSelectionIndustry }}
      columns={columnIndustry}
      key={columnIndustry.key}
      dataSource={props.industry}
      pagination={
        props.industry.length < 10
          ? false
          : {
              pageSize: 10,
              defaultPageSize: 10,
              showSizeChanger: false,
            }
      }
    />
  );
}

export default AMGColumnIndustry;
