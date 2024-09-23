import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buckets: [],
  cards: [],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addBucket: (state, action) => {
      state.buckets.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    addCard: (state, action) => {
      state.cards.push({
        id: Date.now(),
        name: action.payload.name,
        mediaLink: action.payload.mediaLink,
        bucketId: action.payload.bucketId,
      });
    },
    editCard: (state, action) => {
      const { id, updatedCardData } = action.payload;
      const cardIndex = state.cards.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        state.cards[cardIndex] = { ...state.cards[cardIndex], ...updatedCardData };
      }
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    moveCard: (state, action) => {
      const { cardId, newBucketId } = action.payload;
      const card = state.cards.find(card => card.id === cardId);
      if (card) {
        card.bucketId = newBucketId;
      }
    },
  },
});

export const { addBucket, addCard, editCard, deleteCard, moveCard } = cardSlice.actions;
export default cardSlice.reducer;
