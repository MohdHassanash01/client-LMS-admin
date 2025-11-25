import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useFirebase } from "../context/Firebase";

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const { signinUserWithEmailAndPassword, signinWithGoogle, isloggedIn } = useFirebase();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signinUserWithEmailAndPassword(email, password);

      console.log(user);

      if (user) {
        toast.success("✅ Signed in successfully!");
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("Incorrect Crdentials");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isloggedIn) {
      navigate("/");
    }
  }, [isloggedIn, navigate]);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center absolute">
   

      <Card className="dark w-full max-w-sm relative">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button variant="link">
              <Link to="/signup">Sign up</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-blue-500 hover:underline"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <Input
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>

        {/* Google Login */}
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={signinWithGoogle}
            variant="outline"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            disabled={isLoading}
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;