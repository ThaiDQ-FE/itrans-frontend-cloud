import { Button, Tooltip, Modal, Input, DatePicker, Popover } from "antd";
import Images from "../../assets/images/images";
import "./styles.scss";
import "antd/dist/antd.css";
function ModalConfirmDeal(props) {
  console.log(props);
  console.log(props.errors);
  const { TextArea } = Input;
  const content = (
    <div>
      <span>Hệ thống sẽ tự làm tròn số.</span>
      <br />
      <span>Ví dụ:</span>
      <br />
      <span>15.156 {"-->"} 15.16</span>
      <br />
      <span>0.001 {"-->"} 0.00</span>
      <br />
      <span>15. {"-->"} 15</span>
    </div>
  );
  return (
    <Modal
      className="cfr__modal"
      title="Basic Modal"
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      visible={props.openModal}
      onCancel={props.closeModal}
    >
      <h2 style={{ textAlign: "center" }}>Thông tin thỏa thuận</h2>

      <div className="mcd__info">
        <h5 className="mcfinfo__h3">Thông tin vòng gọi vốn</h5>
        <div className="mcfinfo__lineOne">
          <div className="mcfinfo__money">
            <label className="label__fontWeight">Số tiền kêu goi</label>
            <Input
              readOnly
              defaultValue={props.data.fundingAmount}
              size="large"
              style={{ border: props.color.soTienDauTu }}
              style={{ textAlign: "right" }}
              addonAfter="Tỷ VNĐ"
              className="readonly"
            />
          </div>
          <div className="mcfinfo__per">
            <label className="label__fontWeight">Phần trăm cổ phần</label>
            <Input
              readOnly
              defaultValue={props.data.shareRequirement}
              size="large"
              style={{ textAlign: "right" }}
              addonAfter="%"
              className="readonly"
            />
          </div>
          <div className="mcfinfo__per">
            <label className="label__fontWeight">Giai đoạn </label>
            <Input
              readOnly
              defaultValue={props.data.stage}
              size="large"
              className="readonly"
            />
          </div>
        </div>

        <div className="mcfinfo__lineTwo" style={{ marginTop: 10 }}>
          <div className="mcfinfo__money">
            <label className="label__fontWeight">Mô tả sơ lược</label>
            <TextArea
              readOnly
              defaultValue={props.data.summary}
              rows={3}
              className="readonly"
            />
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "75px",
          margin: "auto",
          marginTop: 25,
          marginBottom: 15,
        }}
      />
      <form className="cfr__form mud__form" id="cfr__form">
        <div className="cfr__lineOne">
          <div className="cfr__wrapperSTKG overight">
            <label className="label__fontWeight">
              Số tiền đầu tư{" "}
              <Popover content={content} title={null}>
                {" "}
                (i)
              </Popover>
            </label>
            <Tooltip title={props.errors.soTienDauTu} placement="topRight" color="red">
            <Input
              id="cfr__formSTKG"
              size="large"
              type="number"
              className="cfr__formSTKG input-right-alight"
              addonAfter="Tỷ VNĐ"
              style={{ border: props.color.soTienDauTu }}
              onChange={props.handleChangeValue}
              name="soTienDauTu"
            />
            </Tooltip>
          </div>
          <div className="cfr__wrapperPTCP overight">
            <label className="label__fontWeight">
              Phần trăm cổ phần{" "}
              <Popover content={content} title={null}>
                {" "}
                (i)
              </Popover>
            </label>
            <Tooltip title={props.errors.phanTramCoPhan} placement="topRight" color="red">
            <Input
              size="large"
              type="number"
              className="cfr__formPTCP input-right-alight"
              addonAfter="%"
              style={{ border: props.color.phanTramCoPhan }}
              onChange={props.handleChangeValue}
              name="phanTramCoPhan"
            />
            </Tooltip>
          </div>
        </div>
        <div className="cfr__lineArea">
          <label className="label__fontWeight">Mô tả</label>
          <Tooltip title={props.errors.moTa} placement="topRight" color="red">
          <TextArea
            className="cfr__formMT"
            size="large"
            rows={5}
            style={{ border: props.color.moTa }}
            onChange={props.handleChangeValue}
            name="moTa"
          />
          </Tooltip>
        </div>
        <div className="cfr__submitForm">
          <Button
            onClick={props.handleCreateDealForm}
            className="cfr__sfTao"
            type="primary"
            size="large"
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default ModalConfirmDeal;
