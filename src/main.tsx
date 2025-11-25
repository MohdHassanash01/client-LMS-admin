
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FirebaseProvider } from './context/Firebase.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
  </BrowserRouter>
)
