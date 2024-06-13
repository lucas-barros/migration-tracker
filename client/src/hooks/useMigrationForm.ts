import { Dispatch, SetStateAction, useState } from "react";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../config";
import { serverApi } from "../api";
import { Migration, MigrationForm } from "../types/migration";
import { AxiosError } from "axios";

export type SetMigration = Dispatch<SetStateAction<MigrationForm>>;
export type MigrationMutation = UseMutationResult<
  Migration,
  AxiosError<{ error: string }>,
  MigrationForm
>;

export const useMigrationForm = () => {
  const queryClient = useQueryClient();
  const [migration, setMigration] = useState<MigrationForm>({
    species: "",
    date: "",
    location: undefined,
  });

  const mutation = useMutation<
    Migration,
    AxiosError<{ error: string }>,
    MigrationForm
  >({
    mutationFn: (migration) => {
      return serverApi.post(`${config.serverHost}/migration`, migration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["migrations"] });
    },
  });

  return {
    migration,
    setMigration,
    mutation,
  };
};
