"use client";

import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { CardFooter } from "@material-tailwind/react";
import Link from "next/link";
import { MailIcon, TriangleAlertIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { useEffect, useState } from "react";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const SignIn = () => {



return (
    <ThemeProvider>
      <Button 
        variation="primary" 
        onClick={() => alert('Hello!')}
      >
        Click Me
      </Button>
    </ThemeProvider>
  );
 };

export default SignIn;