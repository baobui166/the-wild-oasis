import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}
