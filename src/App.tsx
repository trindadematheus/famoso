import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from "./screens/Home";
import MapScreen from "./screens/Map";
import ShowScreen from "./screens/Show";
import GlobalStyle from "./styles/global";
import { SingerProvider } from "./hook/use-singer";

function App() {
  return (
    <>
      <BrowserRouter>
        <SingerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/show/:videoId" element={<ShowScreen />} />
          </Routes>
        </SingerProvider>
      </BrowserRouter>

      <Toaster />
      <GlobalStyle />
    </>
  )
}

export default App
