
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem,
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  BookOpen, 
  LayoutDashboard, 
  Menu, 
  X, 
  MessageSquare,
  Bell,
  User,
  Upload
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);

  // Effet pour détecter le défilement pour changer l'apparence de la barre de navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifier le chemin pour définir le rôle et l'état de connexion
  useEffect(() => {
    if (location.pathname.includes('teacher')) {
      setUserRole('teacher');
      setIsLoggedIn(true);
    } else if (location.pathname.includes('student')) {
      setUserRole('student');
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3",
      isScrolled 
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-700 hover:text-indigo-600 transition-colors">
          <GraduationCap className="h-6 w-6" />
          <span className="hidden sm:inline">RecherchesConnect</span>
        </Link>

        {/* Navigation sur ordinateur */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Liens toujours visibles */}
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive("/topics") && "bg-indigo-50 text-indigo-700"
                  )}
                >
                  <Link to="/topics" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Sujets
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              {/* Liens spécifiques aux enseignants */}
              {userRole === 'teacher' && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/teacher-dashboard") && "bg-indigo-50 text-indigo-700"
                      )}
                    >
                      <Link to="/teacher-dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Tableau de bord
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/publish-topic") && "bg-indigo-50 text-indigo-700"
                      )}
                    >
                      <Link to="/publish-topic" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Publier un sujet
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}

              {/* Liens spécifiques aux étudiants */}
              {userRole === 'student' && (
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/student-dashboard") && "bg-indigo-50 text-indigo-700"
                    )}
                  >
                    <Link to="/student-dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Tableau de bord
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              
              {/* Liens utilisateur connecté */}
              {isLoggedIn && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/messages") && "bg-indigo-50 text-indigo-700"
                      )}
                    >
                      <Link to="/messages" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Messages
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/notifications") && "bg-indigo-50 text-indigo-700"
                      )}
                    >
                      <Link to="/notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Boutons Connexion/Inscription pour ordinateur */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="gap-1"
              >
                <Link to="/profile">
                  <User className="h-4 w-4" />
                  Profil
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Connexion</Link>
              </Button>
              <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/register">Inscription</Link>
              </Button>
            </>
          )}
        </div>

        {/* Bouton menu mobile */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-6 border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/topics" 
              className={cn(
                "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                isActive("/topics") 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              Sujets
            </Link>
            
            {userRole === 'teacher' && (
              <>
                <Link 
                  to="/teacher-dashboard" 
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                    isActive("/teacher-dashboard") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Tableau de bord
                </Link>
                <Link 
                  to="/publish-topic" 
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                    isActive("/publish-topic") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Upload className="h-5 w-5" />
                  Publier un sujet
                </Link>
              </>
            )}

            {userRole === 'student' && (
              <Link 
                to="/student-dashboard" 
                className={cn(
                  "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                  isActive("/student-dashboard") 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "hover:bg-gray-100"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                Tableau de bord
              </Link>
            )}

            {isLoggedIn && (
              <>
                <Link 
                  to="/messages" 
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                    isActive("/messages") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </Link>
                <Link 
                  to="/notifications" 
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                    isActive("/notifications") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                </Link>
                <Link 
                  to="/profile" 
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
                    isActive("/profile") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Profil
                </Link>
                <button 
                  className="flex items-center gap-2 py-2 px-3 rounded-md transition-colors hover:bg-gray-100"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Déconnexion
                </button>
              </>
            )}
            
            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Connexion</Link>
                </Button>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Inscription</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
