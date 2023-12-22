import React from "react";
import { Button, Modal, Typography } from "antd";
import { useJobs } from "~/hooks/useJobs";
import { useTranslators } from "~/hooks/useTranslators";

interface DeleteModalProps {
  open: boolean;
  sourceName: string;
  id: string;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  sourceName,
  id,
  onCancel,
}) => {
  const { isDeletingJob, deleteJobAsync } = useJobs();
  const { isDeletingTranslator, deleteTranslatorAsync } = useTranslators();

  return (
    <Modal
      open={open}
      destroyOnClose
      okType="danger"
      okText="Delete"
      title={`Delete ${sourceName}`}
      confirmLoading={isDeletingJob || isDeletingTranslator}
      onCancel={onCancel}
      onOk={async () => {
        if (sourceName === "Job") {
          await deleteJobAsync({ id });
        } else {
          await deleteTranslatorAsync({ id });
        }
        onCancel();
      }}
    >
      <Typography>{`Are you sure to delete this ${sourceName}?`}</Typography>
    </Modal>
  );
};

export default DeleteModal;
