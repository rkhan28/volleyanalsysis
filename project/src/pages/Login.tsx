import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';  // <- our client

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 1) This function runs when you click "Sign In"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    // 2) Call Supabase to sign in with email & password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 3) Check for errors
    if (error) {
      alert('Login failed: ' + error.message);
      console.error('Login error:', error);
      return;
    }

    // 4) If no error, you’re signed in!
    console.log('Logged in user:', data.user);
    
    // 5) Navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Log In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full mb-4 p-2 border"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white">
        Sign In
      </button>
    </form>
  );
}

