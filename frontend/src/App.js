import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Notes from "./pages/Notes";
import Update from "./pages/Update";
import Landing from "./pages/Landing";
import NavigationBar from "./components/NavigationBar";
import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <NavigationBar setSearch={(s) => setSearch(s)} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/notes" element={<Notes search={search} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
