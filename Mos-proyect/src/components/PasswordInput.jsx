import { useState } from "react";

function PasswordInput() {
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Criterios de validación
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 6;

  const isPasswordValid =
    hasUppercase && hasLowercase && hasNumber && hasMinLength;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          className={`mt-2 p-2 w-full border rounded ${
            passwordTouched && !isPasswordValid ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {passwordTouched && !isPasswordValid && (
        <div className="text-sm text-red-500 mt-1 w-full text-left space-y-1">
          {!hasMinLength && <p>• At least 6 characters</p>}
          {!hasUppercase && <p>• Include at least one uppercase letter</p>}
          {!hasLowercase && <p>• Include at least one lowercase letter</p>}
          {!hasNumber && <p>• Include at least one number</p>}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;