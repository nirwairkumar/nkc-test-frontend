// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { signIn as apiSignIn, signOut as apiSignOut, getCurrentUser, signUp as apiSignUp } from "@/integrations/api";
import { MockUser, mockUser as defaultMockUser } from "@/data/mockUser";

// Define context shape explicitly
interface AuthContextType {
    user: MockUser | null;
    session: any;
    loading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password?: string) => Promise<any>;
    signUp: (email: string, password?: string, name?: string, designation?: string) => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<MockUser | null>(null);
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    // isAdmin is derived from the user state
    const isAdmin = user?.email?.includes('admin') || user?.email?.includes('teacher') || user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'teacher' || false;

    useEffect(() => {
        // Initialize from "storage" or default api check
        const initAuth = async () => {
            try {
                // Check localStorage for persisted user
                const storedUser = localStorage.getItem('mock_user');
                const storedSession = localStorage.getItem('mock_session');

                if (storedUser && storedSession) {
                    setUser(JSON.parse(storedUser));
                    setSession(JSON.parse(storedSession));
                }
                setLoading(false);
            } catch (error) {
                console.error("Auth init failed", error);
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const signIn = async (email: string, password?: string) => {
        setLoading(true);
        try {
            const { data, error } = await apiSignIn(email, password || "password");
            if (error) throw error;
            if (data?.user) {
                setUser(data.user);
                setSession(data.session);
                // Persist
                localStorage.setItem('mock_user', JSON.stringify(data.user));
                localStorage.setItem('mock_session', JSON.stringify(data.session));
                return { user: data.user, error: null };
            }
        } catch (err) {
            console.error("Sign in failed", err);
            return { error: err };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await apiSignOut();
            setUser(null);
            setSession(null);
            localStorage.removeItem('mock_user');
            localStorage.removeItem('mock_session');
        } catch (err) {
            console.error("Sign out failed", err);
        }
    };

    const signUp = async (email: string, password?: string, name?: string, designation?: string) => {
        // Mock signup
        return apiSignUp(email, password || "password", { full_name: name, designation });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                isAdmin,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
