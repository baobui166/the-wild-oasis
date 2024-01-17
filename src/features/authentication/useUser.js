import { useQuery } from "@tanstack/react-query";
import { getUserCurrent } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserCurrent,
  });
  return { user, isLoading, isAuthentical: user?.role === "authenticated" };
}
