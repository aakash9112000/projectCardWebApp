import React from 'react';
import { useSelector } from 'react-redux';

const History = () => {
  const history = useSelector(state => state.cards.history);

  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.name} ({item.mediaLink}) - Played at: {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
