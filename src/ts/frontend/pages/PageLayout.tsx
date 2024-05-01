import { useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import Footer from "@components/layout/Footer";
import LoginModal from "@components/modals/LoginModal";
import { useLogoutTimer } from "@hooks/LogoutTimeout.hook"
import NavBar from "@components/layout/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
  const { isLoginModalOpen } = useSelector((state: RootState) => state.modalState);

  useLogoutTimer()

  return (
    <>
      {isLoginModalOpen ? <LoginModal /> :
        <div className="page-layout">
          <NavBar />
          {children}
          <Footer />
        </div>
      }
    </>
  )
}

export default PageLayout;
