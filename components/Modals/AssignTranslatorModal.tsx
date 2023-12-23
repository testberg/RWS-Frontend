import React, { useState, useEffect, useMemo } from "react";
import { Modal, Form, Select } from "antd";
import { TranslationJob } from "~/types";
import { useTranslators } from "~/hooks/useTranslators";
import { useJobs } from "~/hooks/useJobs";

interface AssignTranslatorModalProps {
  open: boolean;
  onCancel: () => void;
  initialData?: TranslationJob;
}

const AssignTranslatorModal: React.FC<AssignTranslatorModalProps> = ({
  open,
  onCancel,
  initialData,
}) => {
  const [form] = Form.useForm();
  const { assginTranslatorAsync, isAssginingTranslator } = useJobs();
  const { translators } = useTranslators();

  const options = useMemo(() => {
    return translators
      ?.filter((translator) => translator.status === "Certified")
      .map((translator) => ({
        value: translator.id,
        label: translator.name,
      }));
  }, [translators]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [form, initialData]);

  const handleOk = async () => {
    const values = await form.validateFields();
    await assginTranslatorAsync({ ...values, jobId: initialData?.id });
    await handleClose();
  };

  const handleClose = async () => {
    await form.resetFields();
    onCancel();
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title={"Update Translator"}
      open={open}
      onCancel={handleClose}
      onOk={handleOk}
      confirmLoading={isAssginingTranslator}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="translatorId"
          label="Name"
          rules={[{ required: true, message: "Please select Name" }]}
        >
          <Select
            showSearch
            placeholder="Select a Name"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignTranslatorModal;
