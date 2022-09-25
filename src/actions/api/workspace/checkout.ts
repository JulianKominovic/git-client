import gitClient from "../client/gitClient";

export default ({ checkoutBranch }: { checkoutBranch: string }) =>
  gitClient({
    endpoint: "/workspace/checkout",
    queryParams: { checkoutBranch },
  });
