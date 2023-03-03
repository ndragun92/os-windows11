export default function log() {
  const onAlert = (message: string) => alert(message);

  return { onAlert };
}
