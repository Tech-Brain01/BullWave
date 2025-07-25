import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/PopOver';
import { Settings, LogOut } from 'lucide-react';

const UserAvatar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getInitials = (name = '') => {
    const [firstName, lastName] = name.split(' ');
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }
    return name.substring(0, 2);
  };

  const handleSignOut = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="premium" size="sm" className="rounded-full w-10 h-10 p-0 text-white font-bold">
          {user ? getInitials(user.username) : 'G'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" forceMount>
          <div className="p-2 space-y-1">
             <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
             </Button>
             <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
             </Button>
          </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;