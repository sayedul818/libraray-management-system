import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'All Books', href: '/books', icon: BookOpen },
  { name: 'Add Book', href: '/create-book', icon: Plus },
  { name: 'Borrow Summary', href: '/borrow-summary', icon: BarChart3 },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-primary border-b shadow-md sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/books" 
            className="flex items-center space-x-3 text-primary-foreground hover:text-accent-light transition-colors"
          >
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-serif font-bold">Library Manager</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className={`
                    ${isActive 
                      ? "bg-primary-foreground/20 text-primary-foreground font-medium" 
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }
                  `}
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/books">
                <BookOpen className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden border-t border-primary-foreground/20">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};