export async function fetchImages() {
  const response = await fetch("/api/files");
  const { data } = await response.json();
  return data;
}
