"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { PasswordInput } from "./ui/password-input";
import { useSignIn, useSignUp } from "@/services";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();

  const pageType = searchParams.get("type");
  const isLogin = pageType === "signIn";

  const signUp = useSignUp();
  const signIn = useSignIn();

  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.email, values.password);

    if (isLogin) {
      signIn.mutateAsync({ ...values, name: "mamad" }).then((response) => {
        console.log({ response });

        toast("success signin");
      });
    } else {
      signUp.mutateAsync({ ...values, name: "mamad" }).then((response) => {
        console.log({ response });

        toast("success signup");
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4  mx-auto p-5 w-full"
            >
              <h1 className="text-center text-2xl ">
                {isLogin ? "Sign In" : "Sign Up"}
              </h1>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p className="text-sm text-center">
                {" "}
                {isLogin ? (
                  <>
                    Do not have an account?{" "}
                    <Link className=" underline" href={"/auth?type=signUp"}>
                      sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Do have an account?{" "}
                    <Link className="underline" href={"/auth?type=signIn"}>
                      sign in{" "}
                    </Link>
                  </>
                )}
              </p>
            </form>
          </Form>

          <div className="relative hidden bg-neutral-100 md:block dark:bg-neutral-800">
            <Image
              src="/placeholder.svg"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
