import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { fetchApiRef, useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type Deployment = {
  id: number;
  kind: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  state: string;
  preview_url: string;
  tag: string;
  branch: any;
  commit: string;
  image_id: string;
  ingress_container_ready: boolean;
  ingress_container_state: string;
  creation_source: string;
  pull_request_number: string;
  containers: Container[];
  deployed_by: DeployedBy;
  compose_file: ComposeFile;
};

type Container = {
  id: number;
  kind: string;
  image: string;
  tag: string;
  variables: Variable[];
  secret_variables: any[];
  created_at: string;
  updated_at: string;
  memory_limit: number;
  memory_request: number;
  entrypoint?: string;
  command?: string;
  port?: number;
  public: boolean;
  repo_id: number;
  continuously_deploy: string;
  receive_incoming_requests: boolean;
  service_name: string;
  controller_name: string;
};

type Variable = {
  name: string;
  value: string;
}

type DeployedBy = {
  kind: string;
  avatar_url: string;
  profile_url: string;
  id: number;
}

type ComposeFile = {
  source: string;
  branch: any;
  path: string;
};


type DenseTableProps = {
  deployments: Deployment[];
};

export const DenseTable = ({ deployments }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'ID', field: 'id' },
    { title: 'Pull Request Number', field: 'pull_request_number' },
    { title: 'Preview URL', field: 'preview_url' },
  ];

  const data = deployments.map(deployment => {
    return {
      id: `${deployment.id}`,
      pull_request_number: deployment.pull_request_number,
      preview_url: deployment.preview_url,
    };
  });

  return (
    <Table
      title="Uffizzi Deployments for Backstage"
      options={{ search: false, paging: true }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {
  const { fetch } = useApi(fetchApiRef);
  const { value, loading, error } = useAsync(async (): Promise<Deployment[]> => {
    const response = await fetch('http://localhost:7007/api/proxy/uffizzi');
    const data = await response.json();
    console.log(data);
    return data.deployments;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable deployments={value || []} />;
};
