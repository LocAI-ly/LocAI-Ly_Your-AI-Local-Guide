// utils/statesCitiesService.js
import state_city from '../public/data/state_city.json'

export const getStates = () => {
  return state_city.map(state => state.name);
};

export const getCitiesByState = (stateName) => {
  const state = state_city.find(state => state.name === stateName);
  console.log(state);
  return state ? state.cities : [];
};
