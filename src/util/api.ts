export const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export async function postJSON<T = any>(
  path: string,
  body: unknown,
  init?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...init,
  });

  if (!res.ok) {
    let msg = "Erro de requisição";
    try {
      msg = (await res.json()).message || msg;
    } catch {}

    throw new Error(msg);
  }

  return res.json();
}
