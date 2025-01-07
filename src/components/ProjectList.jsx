import React from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const ProjectList = ({data}) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Project ID",
      dataIndex: "project_id",
      key: "project_id",
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Project Manager",
      dataIndex: "project_manager",
      key: "project_manager",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/edit/${record.key}`)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ProjectList;
