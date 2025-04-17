
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erreur 404 : Page non trouvée :",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div 
        className="text-center max-w-md px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlertTriangle className="h-20 w-20 text-amber-500 mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Oups ! Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
          <Link to="/">
            <Home className="mr-2 h-5 w-5" /> Retour à l'accueil
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
