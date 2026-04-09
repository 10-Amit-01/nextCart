import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login as authLogin } from "@/store/slices/authSlice";
import { cn } from "@/lib/utils";
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
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    mutate: loginFn,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (response) => {
      const token = response.accessToken;
      const user = response.user;
      dispatch(authLogin({ token: token, user: user }));
      navigate("/");
    },
  });

  function handleGoogleAuth() {
    window.location.href = 'https://ecom-backend-sqc7.onrender.com' + "/api/auth/google";
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginFn({ username, password });
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      className={`${error ? "border-red-500" : ""}`}
                    />
                    {error && (
                      <FieldDescription className="text-red-500">
                        {error instanceof AxiosError
                          ? error.response?.data?.message
                          : error.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className={`${error ? "border-red-500" : ""}`}
                    />
                    {error && (
                      <FieldDescription className="text-red-500">
                        {error instanceof AxiosError
                          ? error.response?.data?.message
                          : error.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <Button type="submit">
                      {isPending ? <Spinner /> : "Login"}
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleGoogleAuth}
                    >
                      Login with Google
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="/signup">Sign up</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
