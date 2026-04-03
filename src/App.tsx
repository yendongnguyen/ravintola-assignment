import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import BookingPage from "./pages/Booking";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;