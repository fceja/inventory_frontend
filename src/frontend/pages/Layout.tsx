import { useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import Footer from "@components/footer/Footer";
import LoginModal from "@components/_modals/LoginModal";
import { useLogoutTimeout } from "@hooks/LogoutTimeout.hook"
import NavBar from "@components/navBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

  useLogoutTimeout(isAuthd)

  return (
    <>
      {!isAuthd ? <LoginModal /> :
        <div className="page-layout">
          <NavBar />
          {children}
          <Footer />
        </div>
      }
    </>
  )
}

export default Layout;
