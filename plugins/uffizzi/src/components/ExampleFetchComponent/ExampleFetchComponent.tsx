import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { fetchApiRef, useApi, configApiRef } from '@backstage/core-plugin-api';
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
    { title: 'Created at', field: 'created_at' },
    { title: 'Deployed by', field: 'deployed_by' },
    { title: 'Preview URL', field: 'preview_url' },
    { title: 'State', field: 'state'}
    
  ];

  const data = deployments.map(deployment => {
    return {
      id: `${deployment.id}`,
      deployed_by : deployment.deployed_by.profile_url,
      created_at : deployment.created_at,
      preview_url: deployment.preview_url,
      state: deployment.state
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
  const config = useApi(configApiRef); 
  const backendUrl = config.getString('backend.baseUrl');
  const { value, loading, error } = useAsync(async (): Promise<Deployment[]> => {
    const response = await fetch(`${backendUrl}/api/proxy/uffizzi`);
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
