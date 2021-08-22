import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { keyTinyMCE } from "../../../../configs/tinyMCE";
function ContentUpdateRound(props) {
  const defaultContent = (editor) => {
    editor.setContent(props.descriptionUpdate);
  };
  const handleChangeEditor = (e) => {
    props.setDescriptionUpdate(e.target.getContent());
  };
  return (
    <Editor
      apiKey={keyTinyMCE}
      init={{
        init_instance_callback: defaultContent,
        height: 350,
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
  );
}

export default ContentUpdateRound;
