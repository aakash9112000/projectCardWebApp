import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBucket, addCard } from '../redux/cardSlice';
import { Button, Input, Select, Row, Col, Divider, Typography } from 'antd';

const { Option } = Select;

const BucketManager = ({ onAddCard }) => {
  const [bucketName, setBucketName] = useState('');
  const [cardName, setCardName] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('');

  const dispatch = useDispatch();
  const buckets = useSelector((state) => state.cards.buckets);

  const handleAddBucket = () => {
    if (bucketName) {
      dispatch(addBucket(bucketName));
      setBucketName('');
    }
  };

  const handleAddOrEditCard = () => {
    if (cardName && mediaLink && selectedBucket) {
      onAddCard({ name: cardName, mediaLink, bucketId: selectedBucket });
      setCardName('');
      setMediaLink('');
    }
  };

  return (
    <div >
      <Divider orientation="left">Add Bucket</Divider>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col>
          <Input
            placeholder="Enter Bucket Name"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
            style={{ width: '250px' }}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddBucket}>
            Add Bucket
          </Button>
        </Col>
      </Row>

      <Divider orientation="left">Add Card</Divider>
      <Row gutter={[16, 16]}>
        <Col>
          <Input
            placeholder="Enter Card Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            style={{ width: '250px' }}
          />
        </Col>
        <Col>
          <Input
            placeholder="Enter Media Link"
            value={mediaLink}
            onChange={(e) => setMediaLink(e.target.value)}
            style={{ width: '300px' }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Select Bucket"
            value={selectedBucket}
            onChange={(value) => setSelectedBucket(value)}
            style={{ width: '250px' }}
          >
            {buckets.map((bucket) => (
              <Option key={bucket.id} value={bucket.id}>
                {bucket.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddOrEditCard}>
            Add Card
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BucketManager;
