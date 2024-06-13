import { useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { serverApi } from "../api";
import { Migration } from "../types/migration";

export const useMigrations = () => {
  const query = useQuery({
    queryKey: ["migrations"],
    queryFn: async () => {
      const response = await serverApi.get<Migration[]>(
        `${config.serverHost}/migration`,
      );
      return response.data;
    },
  });

  return query;
};
