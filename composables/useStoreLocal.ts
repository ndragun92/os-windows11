export default function useStoreLocal() {
  const set = (key: string, value: any) => {
    let data = value;
    if (typeof data === "object") {
      data = JSON.stringify(value) as string;
    }
    localStorage.setItem(key, data as string);
  };

  const get = (key: string, transform = false) => {
    const data = localStorage.getItem(key);
    if (data) {
      if (transform) {
        return JSON.parse(data);
      }
      return data;
    }
  };

  return { set, get };
}
