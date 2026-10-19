"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
    mode: "onSubmit",
  });

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleCreateQuestion)}
      className="flex w-full flex-col gap-10"
      id="question-form"
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel
                htmlFor={field.name}
                className="paragraph-semibold text-dark400_light800"
              >
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                type="text"
                id={field.name}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid ? `${field.name}-error` : undefined
                }
                className="paragraph-regular background-light700_dark300 light-border-2
                                    text-dark300_light700 no-focus min-h-[56px] border"
              />
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError
                  id={`${field.name}-error`}
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel
                htmlFor={field.name}
                className="paragraph-semibold text-dark400_light800"
              >
                Detailed explanation of your problem?{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>

              {/* Code Editor */}
              <Editor
                editorRef={editorRef}
                fieldChange={field.onChange}
                markdown={field.value}
              />

              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError
                  id={`${field.name}-error`}
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col gap-3"
            >
              <FieldLabel
                htmlFor={field.name}
                className="paragraph-semibold text-dark400_light800"
              >
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  {...field}
                  type="text"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? `${field.name}-error` : undefined
                  }
                  className="paragraph-regular background-light700_dark300 light-border-2
                                    text-dark300_light700 no-focus min-h-[56px] border"
                />
                Tags
              </div>
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Add up to 5 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError
                  id={`${field.name}-error`}
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <Field orientation="horizontal" className="mt-14 flex justify-end">
        <Button
          type="submit"
          form="question-form"
          className="primary-gradient text-light-900! w-fit px-5 py-5 cursor-pointer"
        >
          Ask a Question
        </Button>
      </Field>
    </form>
  );
};

export default QuestionForm;
