import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";

const SECRET_KEY = 'Nishant' // Replace with a secure key in production

// Generate JWT
export function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' })
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return null // Invalid token
  }
}

//logout function
export const handleLogout = async (router, setIsAuthenticated) => {
  try {
    await fetch("/api/v1/auth/logout", { method: "POST" }); 
    setIsAuthenticated(false);
    router.replace("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};



//login function
export const loginUser = async (email, password, setError, router) => {
  if (!email) {
    setError("Username required.");
    return;
  }

  if (!password) {
    setError("Password required.");
    return;
  }

  const payload = { email, password };

  const encryptedPayload = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    "Nishant"
  ).toString();

  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: encryptedPayload }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      router.replace("/dashboard");
    } else {
      setError(data.message);
    }
  } catch (error) {
    setError("An error occurred. Please try again.");
  }
};