"use client";

import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@material-tailwind/react";
import Link from "next/link";
import { MailIcon, TriangleAlertIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { useEffect, useState } from "react";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Clock from "@/components/examples/clock/clock";


const SignIn = () => {

  const [enableSubmit, setEnableSubmit] = useState(false);
  const [key, setKey] = useState(0); // State to force re-render
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFormData({
      email: "",
      password: ""
    });
    setError("");
    setLoading(false);
    // Force a full page reload to reset the form and state
  }, []);

  const handleEnableSubmit = (e) => {
    const { name, value } = e.target;
    setFormData(() => {
      formData[name] = value;
      return formData;
    });
    setEnableSubmit(formData.email && formData.password);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to the server
    setError("");
    setLoading(true);
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password
      });

      if (result.error) {
        setError((result.error.message + ". Please try again.") || "An error occurred during sign in. Please try again.");
      } else {
        setEnableSubmit(false); // Disable the submit button after successful sign-in
        formData.set("email", "");
        formData.set("password", "");
        setKey(prevKey => ++ prevKey); // Force re-render to reset the form  

        toast.success("You're successfully signed in!", {
          style: {
            width: "100%",
            maxWidth: "500px",
            marginTop: "5px",
            borderRadius: "10px"
          }
        });

        router.push("/dashboard");
        // Force a full page reload to reset the form and state
      }
    } catch (err) {
      setError("An error occurred during sign in. Please try again.");
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className={`flex min-h-[calc(100vh - 4rem)]
      items-center justify-center bg-white p-4`}>
      <Card className="w-full max-w-lg border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600 w-200">
            Welcome back! Please enter your credentials to sign in to your account.
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <CardContent className="space-y-4" key={key}>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3
              text-sm font-bold text-destructive">
                <span className="flex items-center gap-3"><TriangleAlertIcon size={26} />{error}</span>
              </div>
            )}
            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input onChange={(e) => handleEnableSubmit(e)} className="mb-2" id="email" name="email" type="email" placeholder="jdoe@example.com" required icon={<MailIcon className="pointer-events-none w-4 h-4 absolute top-3/7 transform -translate-y-1/2 right-2" />} />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Password</Label>
              {/* <PasswordInputStrength name="password" id="password" placeholder="password ..." required /> */}
              <PasswordInput onChange={handleEnableSubmit} name="password" id="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-6">
            <Button disabled={!enableSubmit || loading} className="w-full bg-blue-500 hover:bg-blue-600" type="submit">
              {loading ? "Signing in..." : "Sign In"}

              {loading && (
                <svg className="w-16 h-16 animate-spin text-red-600" viewBox="0 0 64 64" fill="none"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="#0000ff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                  </path>
                </svg>
              )}

            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account? <Link href="/sign-up" className="text-blue-500 font-medium hover:underline">Sign Up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <Clock />
    </div>
  );
};

export default SignIn;