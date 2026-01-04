import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/hooks/useAuthActions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, Link } from 'react-router-dom';
import {
    LogOut,
    User,
    History,
    Shield,
    Home,
    HelpCircle,
    Menu,
    Plus
} from 'lucide-react';

export default function Navbar() {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    // ✨ Smooth Dark Blue → Light Blue Hover Gradient
    const navHover =
        "transition-all duration-300 ease-in-out " +
        "hover:bg-gradient-to-r hover:from-blue-900 hover:via-blue-700 hover:to-sky-400 " +
        "hover:text-white " +
        "focus:bg-gradient-to-r focus:from-blue-900 focus:via-blue-700 focus:to-sky-400 focus:text-white " +
        "active:bg-gradient-to-r active:from-blue-900 active:to-blue-600";

    // Primary Sign Up button styles (dark → light blue gradient)
    const signUpClasses =
        "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-sky-400 text-white font-bold transition-all duration-300 ease-in-out";

    const getInitials = (name?: string) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="w-full">
            <div className="container mx-auto flex h-16 items-center justify-between px-1 sm:px-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 bg-clip-text text-transparent hover:from-blue-950 hover:via-blue-800 hover:to-blue-500 transition-colors duration-300 drop-shadow-lg"
                >
                    TestTaker
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">

                    {/* Create Test */}
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/create-test')}
                        className={`flex items-center ${navHover}`}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create Test</span>
                    </Button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className={`flex items-center ${navHover}`}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Button>

                        <Button
                            variant="ghost"
                            onClick={() => navigate('/support')}
                            className={`flex items-center ${navHover}`}
                        >
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Support
                        </Button>

                        {!user && (
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/admin-login')}
                                className={navHover}
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                Admin
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className={navHover}>
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/')}>
                                    <Home className="mr-2 h-4 w-4" />
                                    Home
                                </DropdownMenuItem>
                                <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/support')}>
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Support
                                </DropdownMenuItem>

                                {!user && (
                                    <>
                                        <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/admin-login')}>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Admin
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/login')}>
                                            <User className="mr-2 h-4 w-4" />
                                            Login
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`${navHover} cursor-pointer`}
                                            onClick={() => navigate('/login', { state: { isSignup: true } })}
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            Sign Up
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* User Avatar */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className={`relative h-8 w-8 rounded-full ${navHover}`}>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.user_metadata?.avatar_url} />
                                        <AvatarFallback>{getInitials(user.user_metadata?.full_name)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">
                                            {user.user_metadata?.full_name || 'User'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/profile')}>
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </DropdownMenuItem>

                                {isAdmin ? (
                                    <>
                                        <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/manage-tests')}>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Manage Tests
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/admin-migration')}>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Admin Data Migration
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/my-tests')}>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Your Tests
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/history')}>
                                            <History className="mr-2 h-4 w-4" />
                                            Test History
                                        </DropdownMenuItem>
                                    </>
                                )}

                                <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={() => navigate('/create-test')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Test
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className={`${navHover} cursor-pointer`} onClick={handleSignOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Button variant="ghost" onClick={() => navigate('/login')} className={navHover}>
                                Login
                            </Button>
                            <Button className={signUpClasses} onClick={() => navigate('/login', { state: { isSignup: true } })}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
