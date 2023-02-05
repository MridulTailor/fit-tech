import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import VoiceInput from "../components/VoiceInput";
import Layout from "../components/Layout";
const Home = () => {
  return (
    <>
      <Header />

      <main className="px-4 lg:px-0 mx-auto max-w-[1080px]">
        <div className="bg-transparent flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-medium text-center text-dark">
            Welcome to the GymBoi Website
          </h1>
          <p className="text-xl text-center text-secondary">
            Here you'll find everything you need to reach your fitness goals
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="px-4 py-2 font-medium text-white bg-primary rounded-lg hover:bg-secondary"
            >
              Explore
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
