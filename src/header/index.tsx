import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
const Header = () => {
  return (
    <>
      <Appbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
