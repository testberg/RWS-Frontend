import { Button, Flex, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslators } from "~/hooks/useTranslators";
import { Translator } from "~/types";
import TranslatorModal from "../Modals/TranslatorModal";
import { useState } from "react";
import DeleteModal from "../Modals/Shared/DeleteModal";

type TranslatorListingsState = {
  record?: Translator;
  action?: "create" | "delete";
};

const { Title } = Typography;

const TranslatorListings = () => {
  const [state, setState] = useState<TranslatorListingsState>();

  const { translators } = useTranslators();

  const columns: ColumnsType<Translator> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
    },
    {
      title: "CreditCard Number",
      dataIndex: "creditCardNumber",
      key: "creditCardNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color = "green";

        switch (status) {
          case "Certified":
            color = "blue";
            break;
          case "Deleted":
            color = "volcano";
            break;
          default:
            color = "green";
            break;
        }
        return (
          <>
            <Tag color={color}>{status.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            disabled={record.status === "Deleted"}
            danger
            onClick={() => setState({ record, action: "delete" })}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical>
      <Flex align="center">
        <Title>{"Translators"}</Title>
        <Button
          onClick={() => setState({ action: "create" })}
          style={{ marginTop: 15, marginLeft: 15 }}
        >
          Add
        </Button>
      </Flex>
      <Table
        key={"Translators"}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={translators}
      />
      <TranslatorModal
        open={state?.action === "create"}
        onCancel={() => setState(undefined)}
      />
      <DeleteModal
        id={state?.record?.id}
        open={state?.action === "delete"}
        sourceName={"Translator"}
        onCancel={() => {
          setState(undefined);
        }}
      />
    </Flex>
  );
};

export default TranslatorListings;
