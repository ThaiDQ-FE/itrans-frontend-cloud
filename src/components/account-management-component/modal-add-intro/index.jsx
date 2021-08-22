import React from "react";
import { Button, Modal, Input, Tooltip, Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import { storage } from "../../../configs/firebase";
import { showMessage } from "../../../assets/helper/helper";
function ModalAddIntro(props) {
  const { TextArea } = Input;
  return (
    <Modal
      className="modal__addIntro"
      visible={props.addMoreIntro}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Thêm tiêu đề - nội dung</h3>
      <Form className="modal__formIntroduce" onFinish={props.onSubmit}>
        <div className="modal__addIntroWrapper">
          <div className="modal__addIntroduce">
            <Form.List name="form">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        fieldKey={[fieldKey, "title"]}
                        rules={[
                          {
                            required: true,
                            message: "Tiêu đề không được bỏ trống",
                          },
                          { min: 5, message: "Độ dài tối thiểu là 5 ký tự" },
                          { max: 200, message: "Độ dài tối đa là 200 ký tự" },
                        ]}
                      >
                        <TextArea
                          placeholder="Tiêu đề"
                          style={{ resize: "none" }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        fieldKey={[fieldKey, "content"]}
                        rules={[
                          {
                            required: true,
                            message: "Nội dung không được bỏ trống",
                          },
                          {
                            min: 200,
                            message: "Độ dài tối thiểu là 200 ký tự",
                          },
                          { max: 5000, message: "Độ dài tối đa là 5000 ký tự" },
                        ]}
                      >
                        <TextArea
                          placeholder="Nội dung"
                          style={{ resize: "none" }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="form__close"
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                  <Form.Item className="modal__themTD">
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm tiêu đề và nội dung
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button size="large" type="primary" htmlType="submit">
            Thêm
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalAddIntro;
