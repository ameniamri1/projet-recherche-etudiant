
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 flex flex-col">
      <Navbar />
      <motion.main 
        className={`pt-20 flex-grow ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <footer className="mt-auto py-8 px-4 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and School Name */}
            <div className="flex flex-col items-center md:items-start">
              <img 
                src="/lovable-uploads/ac13c056-4dc2-4ec5-8825-75e9f608d36b.png" 
                alt="ENICarthage Logo" 
                className="h-24 w-auto mb-4"
              />
              <p className="text-gray-600 text-sm">© {new Date().getFullYear()} ResearchConnect. All rights reserved.</p>
            </div>
            
            {/* Contact Information */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">NOUS CONTACTER</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    45 Rue des Entrepreneurs<br />
                    2035 Charguia II<br />
                    Tunis-Carthage-Tunisie
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <p className="text-sm">( +216 ) 71 940 699 / ( +216 ) 71 940 775</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <p className="text-sm">( +216 ) 71 941 579</p>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">LIENS RAPIDES</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="/topics" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                    Sujets de recherche
                  </a>
                </li>
                <li>
                  <a href="https://www.enicarthage.rnu.tn/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                    Site officiel ENICarthage
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
