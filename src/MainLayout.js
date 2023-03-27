import NavBar from "./components/Navbar";
import ViewTransactions from "./components/ViewTransactions";
import UserPage from "./components/UserPage";
import { BrowserRouter as Router, Rou, Route, Routes } from "react-router-dom";

function MainLayout() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/account/:index" element={<UserPage />} />
        <Route
          exact
          path="/transactions/:index"
          element={<ViewTransactions />}
        />
      </Routes>
    </div>
  );
}

export default MainLayout;
