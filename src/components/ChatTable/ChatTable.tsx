import { IResponse } from '@/utils/interface';
import { Pagination, Table } from 'antd';
import { useState } from 'react';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'University',
        dataIndex: 'university',
        key: 'university',
    },
    {
        title: 'URL',
        dataIndex: 'url_path',
        key: 'url_path',
        render: (url: string) => (
            <a target="_blank" rel="noopener" href={url}>
                xem tại đây
            </a>
        ),
    },
];

const ChatTable: React.FC<{ data: IResponse<any> }> = ({ data }) => {
    return (
        <div className="">
            <Table dataSource={data.data.table} columns={columns} pagination={false} />
        </div>
    );
};

export default ChatTable;
