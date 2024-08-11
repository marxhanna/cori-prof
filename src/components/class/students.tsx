import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  email: string;
  tags: string[];
}

type StudentTableProps = {
  userData: any,
}

const App: React.FC = ({ userData }: StudentTableProps) => {
  console.log("TESTE STUDENTS:", userData);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Estudante',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const userDataFormated = userData.users[0].class.users.map((user) => {
    return {
      name: user.user.name,
      email: user.user.email
    };
  });
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      email: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      email: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      email: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return <Table columns={columns} dataSource={userDataFormated} style={{ width: "92%" }} />
};

export default App;