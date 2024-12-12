import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
                <title>{title}</title>
           </Helmet>

    <Header />
      <main style={{ minHeight: "100vh" }}>
      <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps={
  title: 'E-commerce App-shop Now',
  description:'MERN Stack Project',
  keywords:'REact ,Node js,MongoDb,Bootstrape',
  author:'Asadullah Shaikh',
}

export default Layout;
