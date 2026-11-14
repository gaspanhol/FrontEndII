const BASE_URL = import.meta.env.VITE_API_URL;

const api = async <T>(caminho: string, init?: RequestInit): Promise<T> => {
  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

  return resposta.json() as Promise<T>;
};

export { api };
