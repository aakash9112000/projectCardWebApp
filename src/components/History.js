import React from 'react';
import { List, Typography } from 'antd';

const History = ({ history }) => {
  return (
    <div>
      <List
        bordered
        dataSource={history}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.cardName}</Typography.Text>
            <Typography.Text type="secondary">{item.timestamp}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default History;
