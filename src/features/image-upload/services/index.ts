export async function uploadImage(file: File) {
  const payload = new FormData();
  payload.append("file", file);

  const response = await fetch("/api/files", {
    method: "POST",
    body: payload,
  });

  const { imageURL } = await response.json();
  return imageURL;
}
