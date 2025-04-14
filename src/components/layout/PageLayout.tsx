
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
      <Navbar />
      <motion.main 
        className={`pt-20 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <footer className="mt-auto py-6 px-4 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ResearchConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
