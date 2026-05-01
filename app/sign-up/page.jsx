"use client";

import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@material-tailwind/react";
import Link from "next/link";
import { MailIcon, TriangleAlertIcon } from "lucide-react";
import { Person } from "@mui/icons-material";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordInputStrengthChecker } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  useEffect(() => {
    const confirmPassword = formData["confirmPassword"];
    const password = formData["password"];

    if (confirmPassword === password && password.length >= 4) {
      setPasswordMatch((prev) => prev = true);
    } else {
      setPasswordMatch((prev) => prev = false);
    }
    setEnableSubmit(formData.name && formData.email && passwordMatch && isChecked);
  }, [formData, isChecked, passwordMatch]);

  const handleOnCheckedChange = (checked) => {
    setIsChecked(checked);
    formData["agreeToTerms"] = checked;
    const confirmPassword = formData["confirmPassword"];
    const password = formData["password"];

    if (confirmPassword === password && password.length >= 8) {
      setPasswordMatch((prev) => prev = true);
    } else {
      setPasswordMatch((prev) => prev = false);
    }

    setEnableSubmit(formData.name && formData.email && checked && passwordMatch);

  }

  const handleEnableSubmit = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    const confirmPassword = formData["confirmPassword"];
    const password = formData["password"];

    if (confirmPassword === password && password.length >= 4) {
      setPasswordMatch((prev) => prev = true);
    } else {
      setPasswordMatch((prev) => prev = false);
    }

    setEnableSubmit(formData.name && formData.email && passwordMatch && isChecked);

  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to the server
    const formData = new FormData(e.target);

    setError("");
    setLoading(true);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (result.error) {
        setError(result.error.message || "An error occurred during registration. Please try again.");
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        toast.success("You're successfully registered!", {
          style: {
            width: "100%",
            maxWidth: "600px",
            margin: "5 auto",
            borderRadius: "10px"
          }
        });
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
      setPasswordMatch(false);
      setIsChecked(false);
    }
  }

  return (
    <div className={`flex min-h-[calc(100vh - 4rem)]
      items-center justify-center bg-white p-4`}>
      <Card className="w-full max-w-lg border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create an account to start tracking your job applications and stay organized throughout your job search journey.
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3
              text-sm font-bold text-destructive">
                <span className="flex items-center gap-3"><TriangleAlertIcon size={26} />{error}</span>
              </div>
            )}
            <div>
              <Label htmlFor="name" className="mb-1">Name</Label>
              <Input value={formData.name} onChange={(e) => handleEnableSubmit(e)} className="mb-2" name="name" id="name" type="text" placeholder="name ..." icon={<Person className="pointer-events-none w-5 h-5 absolute top-3/7 transform -translate-y-1/2 right-2" />} />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1">Email</Label>
              <Input value={formData.email} onChange={(e) => handleEnableSubmit(e)} className="mb-2" id="email" name="email" type="email" placeholder="jdoe@example.com" required icon={<MailIcon className="pointer-events-none w-5 h-5 absolute top-3/7 transform -translate-y-1/2 right-2" />} />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1">Password</Label>
              {/* <PasswordInputStrength name="password" id="password" placeholder="password ..." required /> */}
              <PasswordInput background={`${passwordMatch ? "bg-green-200" : ""}`} value={formData.password} placeholder="password... at least 8 characters ..." minLength={8} onChange={(e) => handleEnableSubmit(e)} name="password" id="password" required>
                <PasswordInputStrengthChecker />
              </PasswordInput>
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="mb-1">Confirm Password</Label>
              <PasswordInput background={`${passwordMatch ? "bg-green-200" : ""}`} value={formData.confirmPassword} placeholder="confirm password ..." onChange={(e) => handleEnableSubmit(e)} name="confirmPassword" id="confirmPassword" required>
              </PasswordInput>
            </div>
            <div className="mt-6">
              <Checkbox checked={isChecked} onCheckedChange={(checked) => handleOnCheckedChange(checked)} className="mr-2" name="agreeToTerms" id="agreeToTerms" />
              <span className="text-sm text-gray-600">I agree to the <Link href="/legal/agreement" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link href="/legal/policy" className="text-blue-500 hover:underline">Privacy Policy</Link>.</span>
            </div>
            {!passwordMatch && formData.confirmPassword && formData.password && (
              <div className="w-full rounded-md bg-destructive/10 p-3
              text-sm font-bold text-destructive">
                <span className="flex items-center gap-3"><TriangleAlertIcon size={26} />Passwords do not match.</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-6">
            <Button disabled={!enableSubmit || loading} className="w-full bg-blue-500 hover:bg-blue-600" type="submit">
              {loading ? "Creating your account..." : "Sign Up"}

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
              Already have an account? <Link href="/sign-in" className="text-blue-500 font-medium hover:underline">Sign In</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;