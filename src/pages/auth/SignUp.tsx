import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { login as loginAction } from "@/store/slices/authSlice";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
import { useState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const dispatch = useAppDispatch();
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => register(name, email, password),

    onSuccess: (res) => {
      const accessToken = res.accessToken;
      dispatch(loginAction({ token: accessToken, user: res.user }));
      navigate("/");
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message;
        if (errorMessage && errorMessage.includes("exist")) {
          setEmailError(errorMessage);
        } else {
          setPasswordError(errorMessage);
        }
      } else {
        setPasswordError("something went wrong");
      }
    },
  });

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setEmailError(null);
    setPasswordError(null);
    signUp({ name, email, password });
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className={`${emailError ? "border-red-500" : ""}`}
                  />
                  {emailError && (
                    <FieldDescription className="text-red-500">
                      {emailError}
                    </FieldDescription>
                  )}
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`${passwordError ? "border-red-500" : ""}`}
                  />
                  {passwordError && (
                    <FieldDescription className="text-red-500">
                      {passwordError}
                    </FieldDescription>
                  )}
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className={`${passwordError ? "border-red-500" : ""}`}
                  />
                  {passwordError && (
                    <FieldDescription className="text-red-500">
                      {passwordError}
                    </FieldDescription>
                  )}
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">
                      {isPending ? <Spinner /> : "Create Account"}
                    </Button>
                    <Button variant="outline" type="button">
                      Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <a href="/login">Sign in</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
