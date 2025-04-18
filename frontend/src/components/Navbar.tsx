import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon, BarChart3Icon, FileTextIcon } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            alt="EnKoat Logo" 
            className="h-8 w-auto"
            src="/logo.svg" 
          />
        </div>
        <div className="hidden md:flex space-x-1">
          <Button asChild variant="default" size="sm">
            <Link to="/" className="flex items-center space-x-1">
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link to="/quote" className="flex items-center space-x-1">
              <FileTextIcon className="w-4 h-4" />
              <span>Submit Quote</span>
            </Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link to="/dashboard" className="flex items-center space-x-1">
              <BarChart3Icon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Menu
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-sm border-t">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Button asChild variant="default" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/" className="flex items-center space-x-1">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/quote" className="flex items-center space-x-1">
                <FileTextIcon className="w-4 h-4" />
                <span>Submit Quote</span>
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/dashboard" className="flex items-center space-x-1">
                <BarChart3Icon className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;