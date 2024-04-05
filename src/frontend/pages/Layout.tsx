import { useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import LoginModal from "@components/_modals/LoginModal";
import { useLogoutTimeout } from "@hooks/LogoutTimeout.hook"
import NavBar from "@components/navBar/NavBar";
import Footer from "@components/footer/Footer";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

  useLogoutTimeout(isAuthd)

  return (
    <div className="page-layout">
      <NavBar />
      {!isAuthd ? <LoginModal /> : children}
      <Footer />
    </div>
  );
};

export default Layout;
