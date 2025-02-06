import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/configs/axiosConfig";
import { MutationOption } from "./mutations/types";

async function signIn(args: any): Promise<any> {
  const response = await axiosClient.post<any>("/login", args);
  return response.data;
}

export function useSignIn(options?: MutationOption<any, any>) {
  return useMutation({
    mutationFn: signIn,
    ...options,
  });
}
