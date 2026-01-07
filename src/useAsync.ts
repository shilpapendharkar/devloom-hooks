import { useState, useEffect } from "react";

export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [loading, setLoading] = useState(immediate);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction();
      setValue(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) execute();
  }, []);

  return { execute, loading, value, error };
}
