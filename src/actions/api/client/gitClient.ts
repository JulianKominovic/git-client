export default ({
  endpoint,
  queryParams,
}: {
  endpoint: string;
  queryParams?: string;
}) => {
  try {
    const cwd = JSON.parse(localStorage.getItem("info") as any).cwd;
    return fetch(
      `http://localhost:3000${endpoint}?cwd=${cwd}&${queryParams || ""}`
    ).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }
};
