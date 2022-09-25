import gitClient from "../client/gitClient";

export default () =>
  gitClient({
    endpoint: "/workspace/stash",
    queryParams: {},
  });
