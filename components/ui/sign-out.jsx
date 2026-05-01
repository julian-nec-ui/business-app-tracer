"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from '@/lib/auth/auth-client';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignOutButton() {
    const router = useRouter();
    
    return (
        <DropdownMenuItem className="focus:text-blue-600 text-blue-500 font-bold"
            onClick={async () => {
                const result = await signOut();

                if (result.data) {
                    toast.success("Successfully signed out!", {
                        style: {
                            width: "100%",
                            maxWidth: "500px",
                            margin: "5 auto",
                            borderRadius: "10px"
                        }
                    });
                    router.push("/sign-in");
                } else {
                    alert("An error occurred while signing out. Please try again.");
                }
            }}
        >
            Logout
        </DropdownMenuItem>
    );
};