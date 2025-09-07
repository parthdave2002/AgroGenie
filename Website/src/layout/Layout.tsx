import React, { PropsWithChildren } from 'react';
import Footer from '../component/Footer/footer';
import Header from '../component/Header/Header';
import HelpDesk from '../component/HelpDesk/HelpDesk';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
        <Header />
        <HelpDesk /> 
            <main> {children} </main>
        <Footer />
    </>
  );
};

export default Layout;