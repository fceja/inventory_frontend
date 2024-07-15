import Footer from "@components/_pageLayout/footer/_Footer";
import { useLogoutTimer } from "@hooks/useLogoutTimer"
import Nav from "@components/_pageLayout/nav/_Nav";

interface PageLayoutI {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutI> = (props) => {
  const { children } = props

  useLogoutTimer()

  return (
    <div className="page-layout">
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default PageLayout;
