import { StrictMode } from 'react';
import './index.css';
import { Game } from './components/game';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);