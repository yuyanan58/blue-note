import { useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const run = async () => {
    try {
      setLoading(true);
      setError(null);
      const _data = await fetchFunction();
      setData(_data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occured'));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, run };
};
export default useFetch;
