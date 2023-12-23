import { Button, Flex, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import AddJobModal from "../Modals/JobModal";
import { useJobs } from "~/hooks/useJobs";
import { TranslationJob, Translator } from "~/types";
import DeleteModal from "../Modals/Shared/DeleteModal";
import AssignTranslatorModal from "../Modals/AssignTranslatorModal";
import { useTranslators } from "~/hooks/useTranslators";

type JobListingsState = {
  record?: TranslationJob;
  action?: "create" | "delete" | "assign";
};

const { Title } = Typography;

const JobListings = () => {
  const [state, setState] = useState<JobListingsState>();

  const { jobs } = useJobs();
  const { translators } = useTranslators();

  const translatorIndex = useMemo(() => {
    const indexById: { [key: string]: Translator } = {};
    translators?.forEach((translator) => {
      indexById[translator.id] = translator;
    });
    return indexById;
  }, [translators]);

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
      render: (_, { translatorId }) => {
        if (!translatorId) return null;
        return <Typography>{translatorIndex[translatorId]?.name}</Typography>;
      },
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
              setState({
                record,
                action: "delete",
              });
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setState({
                record,
                action: "assign",
              });
            }}
            key={"assign"}
          >
            Assign
          </Button>
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
          onClick={() =>
            setState({
              action: "create",
            })
          }
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
        open={state?.action === "create"}
        onCancel={() => setState(undefined)}
      />
      <DeleteModal
        id={state?.record?.id}
        open={state?.action === "delete"}
        sourceName={"Job"}
        onCancel={() => {
          setState(undefined);
        }}
      />
      <AssignTranslatorModal
        initialData={state?.record}
        open={state?.action === "assign"}
        onCancel={() => {
          setState(undefined);
        }}
      />
    </Flex>
  );
};

export default JobListings;
