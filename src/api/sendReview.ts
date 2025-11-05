const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function sendReview(review: {
  rate: string
  message: string
  apt: number
}) {
  const res = await fetch(`${API_URL}/review/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Ошибка запроса: ${res.status} ${errText}`);
  }

  return res.status;
}
