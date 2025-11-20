import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';

export const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 h-auto p-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-amber-100 text-amber-800 text-sm">
              {user ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 md:block hidden" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-amber-100 text-amber-800">
                {user ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start h-auto p-3"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link to="/account">
              <User className="h-4 w-4 mr-3" />
              <span className="text-sm">View Profile</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start h-auto p-3"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link to="/account?tab=settings">
              <Settings className="h-4 w-4 mr-3" />
              <span className="text-sm">Settings</span>
            </Link>
          </Button>
          
          <div className="border-t my-2" />
          
          <Button 
            variant="ghost" 
            className="w-full justify-start h-auto p-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="text-sm">Sign Out</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
