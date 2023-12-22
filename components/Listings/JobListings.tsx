import { Button, Flex, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddJobModal from "../Modals/JobModal";
import { useJobs } from "~/hooks/useJobs";
import { TranslationJob } from "~/types";
import DeleteModal from "../Modals/Shared/DeleteModal";

const { Title } = Typography;

const JobListings = () => {
  const [openAddModalJob, setOpenAddModalJob] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState("");

  const { jobs } = useJobs();
  const columns: ColumnsType<TranslationJob> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Original Content",
      dataIndex: "originalContent",
      key: "originalContent",
    },
    {
      title: "Translation",
      dataIndex: "translatedContent",
      key: "translatedContent",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Translator",
      dataIndex: "translatorId",
      key: "translatorId",
      // render: (translatorId) => translators.find((t) => (t.id = translatorId)),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color = "green";

        switch (status) {
          case "InProgress":
            color = "blue";
            break;
          case "Completed":
            color = "gray";
            break;
          default:
            color = "green";
            break;
        }
        return (
          <Tag key={status} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            key={"delete"}
            danger
            onClick={() => {
              setSelectedRecordId(record.id);
            }}
          >
            Delete
          </Button>
          <Button key={"assign"}>Assign</Button>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical>
      <Flex align="center">
        <Title>{"Jobs"}</Title>
        <Button
          style={{ marginTop: 15, marginLeft: 15 }}
          onClick={() => setOpenAddModalJob(true)}
        >
          Add
        </Button>
      </Flex>
      <Table
        key={"Jobs"}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={jobs}
      />
      <AddJobModal
        open={openAddModalJob}
        onCancel={() => setOpenAddModalJob(false)}
      />
      <DeleteModal
        id={selectedRecordId}
        open={!!selectedRecordId}
        sourceName={"Job"}
        onCancel={() => {
          setSelectedRecordId("");
        }}
      />
    </Flex>
  );
};

export default JobListings;
