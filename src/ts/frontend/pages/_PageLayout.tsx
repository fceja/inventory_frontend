import { useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import Footer from "@components/_pageLayout/footer/_Footer";
import LoginModal from "@components/_modals/LoginModal";
import { useLogoutTimer } from "@hooks/LogoutTimeout.hook"
import Nav from "@components/_pageLayout/nav/_Nav";

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
          <Nav />
          {children}
          <Footer />
        </div>
      }
    </>
  )
}

export default PageLayout;
