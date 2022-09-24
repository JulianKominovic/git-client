import gitClient from "../client/gitClient";

export default (queryParams?: string) =>
  gitClient({
    endpoint: "/branch",
    queryParams,
  });
