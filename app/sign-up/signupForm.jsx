import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg max-w-sm mx-auto">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <UserPlus /> Register
      </h2>
      
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Username"
          className="pl-10 p-2 border rounded w-full"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="email"
          placeholder="Email"
          className="pl-10 p-2 border rounded w-full"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="password"
          placeholder="Password"
          className="pl-10 p-2 border rounded w-full"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full flex items-center justify-center gap-2">
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
