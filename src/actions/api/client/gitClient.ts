export default ({
  endpoint,
  queryParams,
}: {
  endpoint: string;
  queryParams?: any;
}) => {
  try {
    const cwd = JSON.parse(localStorage.getItem("info") as any).cwd;
    return fetch(
      `http://localhost:3000${endpoint}?cwd=${cwd}&${Object.entries(
        queryParams || {}
      )
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`
    )
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((res) => {
        console.log(res);
        if (res.error || (typeof res === "string" && /error/i.test(res)))
          throw new Error(res.message);
        return res;
      });
  } catch (err) {
    console.error(err);
  }
};
