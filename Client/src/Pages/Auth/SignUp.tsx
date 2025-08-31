import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.tsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, googleLogin, loading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trimStart() })); // prevent accidental leading spaces
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.FirstName || !formData.LastName) {
      alert("Please enter your first and last name.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    if (
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      alert("Password must include at least one uppercase letter and one number.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await signup({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="FirstName" className="block text-gray-800 text-sm mb-2">
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium placeholder-gray-400 transition"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="LastName" className="block text-gray-800 text-sm mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium placeholder-gray-400 transition"
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-gray-800 text-sm mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium placeholder-gray-400 transition"
          required
          disabled={loading}
        />
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="phone" className="block text-gray-800 text-sm mb-2">
          Mobile Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium placeholder-gray-400 transition"
          pattern="[0-9]{10}"
          required
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-gray-800 text-sm mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium placeholder-gray-400 transition pr-12"
            required
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-gray-800 text-sm mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium placeholder-gray-400 transition pr-12"
            required
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
          >
            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2 ${
          loading
            ? "bg-indigo-700 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-4 text-gray-800 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-gray-600 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
      >
        <FcGoogle size={20} />
        Sign Up with Google
      </button>

      {/* Login Link */}
      <p className="text-center text-gray-500 text-sm">
        Already have an account?{" "}
        <a 
          href="/auth/login" 
          className="text-indigo-700 hover:text-indigo-500 font-medium"
        >
          Log in
        </a>
      </p>
    </form>
  );
};

export default SignUp;
