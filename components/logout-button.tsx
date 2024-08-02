"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from "sonner"

interface LogoutButtonProps {
    children: React.ReactNode;
}
const LogoutButton = ({
    children
}: LogoutButtonProps) => {

    const navigate = useRouter();
    const SignOut= () =>{
        if (typeof window !== 'undefined' && window.localStorage){
          localStorage.removeItem("token");
          navigate.push('/');
          window.location.reload();
        }
    }

  return (
    <button onClick={SignOut}>
      {children}
    </button>
  );
};
export default LogoutButton;