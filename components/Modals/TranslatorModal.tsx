import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { Translator } from "~/types";
import { useTranslators } from "~/hooks/useTranslators";

interface TranslatorModalProps {
  open: boolean;
  onCancel: () => void;
  // onSubmit: (translator: Translator) => void;
  initialData?: Translator; // For updating, pass the initial data
}

const TranslatorModal: React.FC<TranslatorModalProps> = ({
  open,
  onCancel,
  // onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [isUpdating, setIsUpdating] = useState(false);
  const { addTranslatorAsync, isAddingTranslator } = useTranslators();

  useEffect(() => {
    // If initialData is provided, set form values for update
    if (initialData) {
      form.setFieldsValue(initialData);
      setIsUpdating(true);
    } else {
      form.resetFields();
      setIsUpdating(false);
    }
  }, [form, initialData]);

  const handleOk = async () => {
    const values = await form.validateFields();
    await addTranslatorAsync(values);
    await handleClose();
  };

  const handleClose = async () => {
    await form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={isUpdating ? "Update Translator" : "Add Translator"}
      open={open}
      onCancel={handleClose}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="hourlyRate"
          label="Hourly Rate"
          rules={[{ required: true, message: "Please enter an hourly rate" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select>
            <Select.Option value="Applicant">Applicant</Select.Option>
            <Select.Option value="Certified">Certified</Select.Option>
            <Select.Option value="Deleted">Deleted</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="creditCardNumber"
          label="Credit Card Number"
          rules={[
            { required: true, message: "Please enter a credit card number" },
            {
              pattern: /^[0-9]{16}$/,
              message: "Please enter a valid 16-digit credit card number",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TranslatorModal;
