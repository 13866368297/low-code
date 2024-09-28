import React from 'react';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import Position from '../Position';
import './index.scss';
export default function ICard({ layout, visible }) {
  return (
    <>
      {!visible && (
        <Card
          style={{ width: 300, height: 311 }}
          cover={
            <div style={{ height: 165, width: '100%' }}>
              <img
                alt="example"
                width={'100%'}
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </div>
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      )}
    </>
  );
}
