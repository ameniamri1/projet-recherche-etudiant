
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { GraduationCap, BookOpen, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect for detecting scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

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
          <span className="hidden sm:inline">ResearchConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
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
                    Topics
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
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
                    Teacher Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Login/Register buttons for desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Link to="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
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
              Topics
            </Link>
            
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
              Teacher Dashboard
            </Link>
            
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
