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
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../queries/authentication";
import { Link, replace, useNavigate } from "react-router";
import { useState } from "react";

export function SignupForm({ ...props }) {
  const navigate = useNavigate();

  const [passworNotdMatch, setPasswordNotMatch] = useState(false);

  const mutation = useMutation({
    mutationFn: signUp,
    mutationKey: ["user"],
    onMutate: (data) => {
      console.log(data);
      navigate("/login", { replace: true });
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = new FormData(evt.currentTarget);
    const data = Object.fromEntries(form);
    if (data.password !== data.confirmPassword) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
      delete data["confirmPassword"];
      mutation.mutate(data);
    }
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="John"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" name="password" required />
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
                type="password"
                name="confirmPassword"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {passworNotdMatch && (
                <FieldError>Passwords does not match.</FieldError>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? 
                  <Link to={"/login"} replace>
                    Sign in
                  </Link>{" "}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
