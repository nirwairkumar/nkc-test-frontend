// src/hooks/useAuthActions.ts
import { signIn, signUp, signOut as apiSignOut } from '@/integrations/api';

export async function signUpWithEmail(email: string, password: string, name?: string, designation?: string) {
    return signUp(email, password, { full_name: name, designation });
}


export async function sendMagicLoginLink(email: string) {
    console.log("Mock Magic Link sent to:", email);
    return Promise.resolve();
}

export async function signInWithEmail(email: string, password: string) {
    return signIn(email, password);
}

export async function signInWithGoogle() {
    console.log("Mock Google Sign In initiated");
    // Simulate redirect or success
    return { data: { user: { email: 'mock@google.com' }, session: { access_token: 'mock-google-token' } }, error: null };
}


export async function signOut() {
    return apiSignOut();
}

export async function resetPasswordForEmail(email: string) {
    console.log("Mock Password Reset sent to:", email);
    return { data: {}, error: null };
}

