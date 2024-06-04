import {
  Button,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  Upload,
  message,
} from "antd";
import { useContext, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import { uploadFileToTemp } from "../../services/fileService";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import SACSunEditor from "./SACSunEditor";
import { createArticle } from "../../services/articleService";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type FieldType = {
  title: string;
  description: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const CreateNewBlogPage = ({ returnHome }: { returnHome: VoidFunction }) => {
  const { trans } = useContext(LangContext);
  const [, context] = message.useMessage();
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUploadAction = async (file: RcFile) => {
    const path = await uploadFileToTemp(file, "article");
    setImage(path);
    return path;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRemoveImage = () => {
    // filter out the removed image
    setImage("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file;
    if (status !== "uploading") {
      message.loading(`${info.file.name} file uploading...`);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleSubmit = async (values: FieldType) => {
    const { title, description } = values;
    console.table({ title, description, image, content });

    try {
      const result = await createArticle({
        title,
        description,
        content,
        image,
      });
      if (result) {
        message.success("Create article successfully");
        returnHome();
      } else {
        message.error("Create article failed");
      }
    } catch (err) {
      message.error("Create article failed (duplicate title)");
    }
  };

  return (
    <>
      {context}
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label={trans({ en: "Title", vi: "Tiêu đề" })}
          name="title"
          rules={[
            {
              required: true,
              message: trans({
                en: "Please input Title",
                vi: "Hãy nhập Tiêu đề",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={trans({ en: "Description", vi: "Mô tả" })}
          name="description"
          rules={[
            {
              required: true,
              message: trans({
                en: "Please input Description",
                vi: "Hãy nhập Mô tả",
              }),
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label={trans({
            en: "Article preview image",
            vi: "Hình ảnh đại diện bài viết",
          })}
        >
          <Upload
            action={handleUploadAction}
            onChange={handleUploadChange}
            listType="picture-card"
            showUploadList
            hasControlInside
            onPreview={handleUploadPreview}
            onRemove={handleRemoveImage}
            className="my-2"
            maxCount={1}
          >
            {!image ? (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            ) : null}
          </Upload>
        </Form.Item>

        <Form.Item
          label={trans({
            en: "Article content",
            vi: "Nội dung bài viết",
          })}
        >
          <SACSunEditor value={content} setValue={setContent} />
          <p className="italic text-red-500">
            Mở full màn hình ở cái nút 2 mũi tên chỗ thanh công cụ nha
          </p>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 24 }}>
          <Button
            block
            size="large"
            type="primary"
            className="mt-2 bg-primary"
            htmlType="submit"
          >
            {trans({ en: "Create new article", vi: "Tạo bài viết" })}
          </Button>
        </Form.Item>
      </Form>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default CreateNewBlogPage;
