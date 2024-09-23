import React, { useState } from 'react';
import { List, Checkbox, Button, Select, Typography, Divider, Input, Modal } from 'antd';
import { DeleteOutlined, PlayCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const CardList = ({ cards, buckets, onDelete, onPlay, onMove, selectedCards, onSelect, onEdit }) => {
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedCardName, setEditedCardName] = useState('');
  const [editedCardMediaLink, setEditedCardMediaLink] = useState('');

  const handleEditClick = (card) => {
    setEditingCardId(card.id);
    setEditedCardName(card.name);
    setEditedCardMediaLink(card.mediaLink);
  };

  const handleEditSave = () => {
    if (editedCardName && editedCardMediaLink) {
      onEdit(editingCardId, { name: editedCardName, mediaLink: editedCardMediaLink });
      setEditingCardId(null); // Exit editing mode
    } else {
      Modal.error({ title: 'Please provide both name and media link.' });
    }
  };

  const handleEditCancel = () => {
    setEditingCardId(null); // Exit editing mode
  };

  return (
    <div>
      <Divider orientation="left">Card List</Divider>
      {buckets.map((bucket) => (
        <div key={bucket.id} style={{ marginTop: '20px' }}>
          <Typography.Title level={3}>{bucket.name}</Typography.Title>
          <List
            bordered
            dataSource={cards.filter((card) => card.bucketId === bucket.id)}
            renderItem={(card) => (
              <List.Item
                actions={[
                  <Checkbox
                    checked={selectedCards.includes(card.id)}
                    onChange={() => onSelect(card.id)}
                  />,
                  <Button
                    icon={<PlayCircleOutlined />}
                    type="link"
                    onClick={() => onPlay(card.mediaLink, card.name)}
                  >
                    Play
                  </Button>,
                  <Button
                    icon={<DeleteOutlined />}
                    type="link"
                    danger
                    onClick={() => onDelete(card.id)}
                  >
                    Delete
                  </Button>,
                  <Button
                    icon={<EditOutlined />}
                    type="link"
                    onClick={() => handleEditClick(card)}
                  >
                    Edit
                  </Button>,
                  <Select
                    onChange={(newBucketId) => onMove(card.id, newBucketId)}
                    style={{ width: '150px' }}
                  >
                    {buckets.map((b) => (
                      <Option key={b.id} value={b.id}>
                        {b.name}
                      </Option>
                    ))}
                  </Select>,
                ]}
              >
                {card.id === editingCardId ? (
                  <div>
                    <Input
                      value={editedCardName}
                      onChange={(e) => setEditedCardName(e.target.value)}
                      placeholder="Card Name"
                      style={{ marginBottom: '10px' }}
                    />
                    <TextArea
                      value={editedCardMediaLink}
                      onChange={(e) => setEditedCardMediaLink(e.target.value)}
                      placeholder="Media Link"
                      rows={2}
                      style={{ marginBottom: '10px' }}
                    />
                    <Button
                      type="primary"
                      onClick={handleEditSave}
                      style={{ marginRight: '10px' }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleEditCancel}>Cancel</Button>
                  </div>
                ) : (
                  card.name
                )}
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
