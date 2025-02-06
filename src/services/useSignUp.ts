import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/configs/axiosConfig";
import { MutationOption } from "./mutations/types";

async function signUp(args: any): Promise<any> {
  const response = await axiosClient.post<any>("/register", args);
  return response.data;
}

export function useSignUp(options?: MutationOption<any, any>) {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
}
