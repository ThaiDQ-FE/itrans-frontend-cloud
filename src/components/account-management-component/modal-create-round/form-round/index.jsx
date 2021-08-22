import React from "react";
import { Button, Input, Tooltip, Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import { Editor } from "@tinymce/tinymce-react";
import { defaultContentForUser, keyTinyMCE } from "../../../../configs/tinyMCE";
function FormCreateRound(props) {
  const defaultContent = (editor) => {
    editor.setContent(defaultContentForUser());
  };
  const handleChangeEditor = (e) => {
    props.setContent(e.target.getContent());
  };
  return (
    <div className="formcr__wrapper">
      <div className="formcr__editor">
        <Editor
          apiKey={keyTinyMCE}
          init={{
            init_instance_callback: defaultContent,
            height: 400,
            menubar: false,
            language: "vi",
            language_url: "/langs/vi.js",
            fontsize_formats:
              "8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
            plugins: [
              "advlist autolink lists link image preview charmap print preview anchor help searchreplace visualblocks code insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | fontsizeselect | forecolor backcolor | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | help",
            toolbar_mode: "floating",
          }}
          onChange={handleChangeEditor}
        />
      </div>
      <div className="formcr__bottom">
        <div className="formcr__noti">
          <ul>
            <li>
              Giai đoạn gọi vốn là{" "}
              <span className="formcr__stage">giai đoạn hiện tại</span>
            </li>
            <li>
              Tối đa{" "}
              <span className="formcr__active">1 vòng gọi vốn hiện tại</span> và{" "}
              <span className="formcr__pending">1 vòng gọi vốn đang chờ</span>
            </li>
          </ul>
        </div>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          disabled={props.loading === true || props.loadingCer === true}
          onClick={props.onSubmit}
        >
          Tạo vòng gọi vốn
        </Button>
      </div>
    </div>
  );
}

export default FormCreateRound;
