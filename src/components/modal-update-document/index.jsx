import React from "react";
import { Button, Modal, Input, Tooltip, Form, Space } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { getLocalStorage } from "../../assets/helper/helper";
function ModalUpdateDocument(props) {
    const { TextArea } = Input;
    return (
        <Modal
            className="modal__editDoc"
            visible={props.editDoc}
            maskClosable={true}
            footer={null}
            closable={true}
            destroyOnClose={true}
            onCancel={props.closeModal}
        >
            <h3 style={{ textAlign: "center" }}>Chỉnh sửa tài liệu</h3>
            <div className="modal__editDocWrapper">
                <div className="modal__editTitle">
                    <label>Tiêu đề</label>
                    <Tooltip>
                        <TextArea
                            style={{ resize: "none" }}
                            defaultValue={props.editDoc === true ? getLocalStorage("infoEditDoc").name : ''}
                            onChange={props.handleChangeValue}
                            name="title"
                        />
                    </Tooltip>
                </div>
                <div className="modal__editContentDoc">
                    <label>Nội dung</label>
                    <Tooltip>
                        <TextArea
                            style={{ resize: "none" }}
                            defaultValue={props.editDoc === true ? getLocalStorage("infoEditDoc").linkResource : ''}
                            onChange={props.handleChangeValue}
                            rows={3}
                            name="content"
                        />
                    </Tooltip>
                </div>
                <div className="modal__editActionDoc">
                    <Button type="primary" onClick={props.onSubmit}>
                        Cập nhật
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalUpdateDocument;
