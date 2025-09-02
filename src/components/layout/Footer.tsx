import { BookOpen, Github, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo & Description */}
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-serif font-semibold text-foreground">Library Manager</h3>
              <p className="text-sm text-muted-foreground">Minimal & Beautiful Library Management</p>
            </div>
          </div>

          {/* Credits */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-accent" />
            <span>using React & Redux Toolkit</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Library Manager. A minimal library management system.</p>
        </div>
      </div>
    </footer>
  );
};