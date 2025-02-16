import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Header />  {/* Always present on every page */}
      <Outlet />   {/* This will render Home, Gallery, About, etc. */}
      <Footer />   {/* Footer will be the same for all pages */}
    </>
  );
};

export default MainLayout;
