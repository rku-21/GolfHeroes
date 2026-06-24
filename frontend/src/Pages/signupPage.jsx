import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {signup}=useAuthStore();

 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.username && formData.email) {
        setStep(2);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword && formData.agreeToTerms) {
      const {confirmPassword,...singupData}=formData;
      setLoading(true);
      signup(singupData);
      
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl">⛳</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join GolfHeroes</h1>
          <p className="text-gray-600">Create your account and start winning rewards</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full transition ${step >= 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 h-2 rounded-full transition ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {step === 1 ? (
            <>
              {/* Step 1: Personal Information */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-sm text-gray-600">Let's start with your basic details</p>
              </div>

              
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-2">
                  username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="John123"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition"
                    required
                  />
                </div>
              </div>


              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition"
                    required
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={20} />
              </button>
            </>
          ) : (
            <>
              {/* Step 2: Account Setup & Preferences */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Secure Your Account</h2>

              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">At least 8 characters with uppercase, lowercase, and numbers</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              

              {/* Terms & Conditions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-green-600 hover:text-green-700 font-semibold">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-700 font-semibold">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'} <ChevronRight size={20} />
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition font-semibold"
              >
                Back
              </button>
            </>
          )}
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
              Sign in here
            </a>
          </p>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>We respect your privacy. Your data is secure with us.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
