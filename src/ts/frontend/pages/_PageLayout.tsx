import Footer from "@components/_pageLayout/footer/_Footer";
import { useLogoutTimer } from "@hooks/LogoutTimeout.hook"
import Nav from "@components/_pageLayout/nav/_Nav";

interface PageLayoutI {
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutI) => {
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
