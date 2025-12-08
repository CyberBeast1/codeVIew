import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/clerk-react";
import toast from "react-hot-toast";
function HomePage() {
  return (
    <>
      <h1 className="text-blue-900 bg-blue-400 text-2xl p-6">
        Welcome to CodeView
      </h1>
      <button className="btn btn-primary" onClick={()=> toast.success("You Shooted a rocket")}>Shoot</button>
      <UserButton />
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </>
  );
}

export default HomePage;
