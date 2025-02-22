import { Box } from "@mui/material";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect, useMemo } from "react";
import * as Parchment from "parchment";
import ReactQuill from "react-quill-new";
import Quill from "quill";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  readonly?: boolean;
}

const QuillEditor = (props: QuillEditorProps) => {
  const { value, setValue, readonly = false } = props;

  const fontSizes = useMemo(
    () => [
      "11px",
      "13px",
      "15px",
      "16px",
      "19px",
      "24px",
      "28px",
      "30px",
      "34px",
      "38px",
    ],
    []
  );

  const fontSizeCss = fontSizes.map((size) => {
    return `.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="${size}"]::before {
      content: '${size}';
      font-size: ${size};
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="${size}"]::before {
      content: '${size}';
    }`;
  });

  useEffect(() => {
    const FontSizeStyle = Quill.import(
      "attributors/style/size"
    ) as Parchment.Attributor;
    FontSizeStyle.whitelist = fontSizes;
    Quill.register(FontSizeStyle, true);
  }, [fontSizes]);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [
        {
          size: fontSizes,
        },
      ],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ align: [] }, { color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
    clipboard: {
      matchVisual: false,
    },
    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  return (
    <Box>
      <style>{fontSizeCss.join("\n")}</style>
      <ReactQuill
        modules={modules}
        value={value}
        onChange={setValue}
        readOnly={readonly}
        css={{
          ".ql-container.ql-disabled": {
            border: "none",
          },
          ".ql-editor": {
            minHeight: "300px",
          },
          ".ql-toolbar": {
            display: readonly ? "none" : "block",
          },
        }}
      />
    </Box>
  );
};

export default QuillEditor;
