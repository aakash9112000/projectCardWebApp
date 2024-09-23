import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, deleteCard, moveCard, editCard } from '../redux/cardSlice';
import { Button, Tabs, message } from 'antd';
import BucketManager from './BucketManager';
import CardList from './CardList';
import History from './History';
import MediaPlayerModal from './MediaPlayerModal';
import LoginPage from './Login';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const { TabPane } = Tabs;

const CardManager = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMedia, setCurrentMedia] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [titleColor, setTitleColor] = useState('#007bff');
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [cards, setCards] = useState([]); // Local state for cards

  const dispatch = useDispatch();
  const buckets = useSelector((state) => state.cards.buckets);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    message.info('Logged out successfully.');
  };

  const handlePlayMedia = (mediaLink, cardName) => {
    const testMediaLink = mediaLink || 'https://www.w3schools.com/html/mov_bbb.mp4'; // Fallback URL
    setCurrentMedia(testMediaLink);
    setIsModalVisible(true);
    const timestamp = new Date().toLocaleString();
    setHistory((prevHistory) => [
      ...prevHistory,
      { cardName, mediaLink: testMediaLink, timestamp },
    ]);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId));
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    toast.success('Card deleted successfully.');
  };

  const handleBulkDelete = () => {
    selectedCards.forEach((cardId) => dispatch(deleteCard(cardId)));
    setCards((prevCards) => prevCards.filter((card) => !selectedCards.includes(card.id)));
    setSelectedCards([]);
    toast.success('Selected cards deleted successfully.');
  };

  const handleSelectCard = (cardId) => {
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.includes(cardId)
        ? prevSelectedCards.filter((id) => id !== cardId)
        : [...prevSelectedCards, cardId]
    );
  };

  const handleAddCard = (cardData) => {
    dispatch(addCard(cardData));
    setCards((prevCards) => [
      ...prevCards,
      { id: Date.now(), ...cardData } // Ensure the new card is added locally
    ]);
    toast.success('Card added successfully.');
  };

  const handleMoveCard = (cardId, newBucketId) => {
    dispatch(moveCard({ cardId, newBucketId }));
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, bucketId: newBucketId } : card
      )
    );
    toast.success('Card moved successfully.');
  };

  const handleEditCard = (cardId, updatedCardData) => {
    dispatch(editCard({ cardId, updatedCardData }));
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, ...updatedCardData } : card
      )
    );
    toast.success('Card updated successfully.');
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleColor(generateRandomColor());
      setTriggerAnimation(true);
      setTimeout(() => setTriggerAnimation(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ToastContainer />
      {isAuthenticated && <Header onLogout={handleLogout} />}

      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div style={{ padding: '15px', background: 'white' }}>
          <BucketManager onAddCard={handleAddCard} />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Manage Cards" key="1">
              <CardList
                cards={cards}
                buckets={buckets}
                onDelete={handleDeleteCard}
                onPlay={handlePlayMedia}
                onMove={handleMoveCard}
                selectedCards={selectedCards}
                onSelect={handleSelectCard}
                onEdit={handleEditCard}
              />
              {selectedCards.length > 0 && (
                <Button
                  type="danger"
                  onClick={handleBulkDelete}
                  style={{ marginTop: '10px', backgroundColor: '#d9534f', borderColor: '#d9534f' }}
                >
                  Bulk Delete
                </Button>
              )}
            </TabPane>
            <TabPane tab="History" key="2">
              <History history={history} />
            </TabPane>
          </Tabs>
          <MediaPlayerModal
            visible={isModalVisible}
            mediaLink={currentMedia}
            onClose={() => setIsModalVisible(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CardManager;
