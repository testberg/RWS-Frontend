import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message, Tabs } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { useJobs } from "~/hooks/useJobs";
import { trpc } from "~/utils/trpc";

interface AddJobModalProps {
  open: boolean;
  onCancel: () => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<any>();
  const [activeKey, setActiveKey] = useState("details");
  const { addJobAsync, isAddingJob } = useJobs();
  const utils = trpc.useUtils();

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setFile(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleFileUpload = async (customerName?: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/CreateJobWithFile?customer=${customerName ?? ""}`,
        {
          method: "POST",
          headers: {},
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      await utils.job.list.invalidate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (activeKey === "details") {
        await addJobAsync(values);
      } else {
        await handleFileUpload(values.customerName);
      }

      await handleClose();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleClose = async () => {
    await form.resetFields();
    onCancel();
  };

  const allowedExtensions = ["txt", "xml"];

  const beforeUpload = (file: RcFile) => {
    const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase() || "";
    const isAllowed = allowedExtensions.includes(fileExtension);

    if (!isAllowed) {
      message.error(
        `File type not allowed. Please upload ${allowedExtensions.join(
          ", "
        )} files.`
      );
    }

    return isAllowed;
  };

  return (
    <Modal
      title="Add Job"
      open={open}
      onCancel={handleClose}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={isAddingJob}
    >
      <Tabs
        defaultActiveKey="upload"
        tabPosition="left"
        activeKey={activeKey}
        onChange={handleTabChange}
        items={[
          {
            key: "upload",
            label: "Upload File",
            children: (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="File Upload"
                  name="file"
                  rules={[
                    {
                      required: activeKey === "upload",
                      message: "Please select a file",
                    },
                  ]}
                >
                  <Upload
                    multiple={false}
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    onChange={handleFileChange}
                  >
                    <Button icon={<InboxOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
                {file?.name?.split(".")?.pop()?.toLowerCase() === "txt" && (
                  <Form.Item
                    label="Customer Name"
                    name="customerName"
                    rules={[
                      {
                        required: activeKey === "upload",
                        message: "Please enter the Customer Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                )}
              </Form>
            ),
          },
          {
            key: "details",
            label: "Enter Details",
            children: (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Original Content"
                  name="originalContent"
                  rules={[
                    {
                      required: activeKey === "details",
                      message: "Please enter the content",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="Customer Name"
                  name="customerName"
                  rules={[
                    {
                      required: activeKey === "details",
                      message: "Please enter the Customer Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default AddJobModal;
