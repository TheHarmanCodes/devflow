"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  DefaultValues,
  FieldPath,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constant/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T, unknown>;
  defaultValues: Partial<T>;
  formType: "SIGN_UP" | "SIGN_IN";
  onSubmit: (data: T) => Promise<{ success: boolean; data: unknown }>;
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema as never),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO: Authenticate user
  };

  const buttonText = formType === "SIGN_UP" ? "Sign Up" : "Sign In";

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      {Object.keys(defaultValues).map((field) => (
        <FieldGroup key={field}>
          <Controller
            name={field as FieldPath<T>}
            key={field}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex w-full flex-col gap-2.5"
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="paragraph-medium text-dark400_light700"
                >
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>
                <Input
                  {...field}
                  required
                  type={field.name === "password" ? "password" : "text"}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="paragraph-regular background-light900_dark300 light-border-2
                                    text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      ))}
      <Button
        disabled={form.formState.isSubmitting}
        className="primary-gradient paragraph-medium min-h-12 w-full 
        rounded-2 px-4 py-3 font-inter text-light-900! cursor-pointer"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>
      {formType === "SIGN_IN" ? (
        <p>
          Don't have an account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="paragraph-semibold primary-text-gradient"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="paragraph-semibold primary-text-gradient"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};
export default AuthForm;
