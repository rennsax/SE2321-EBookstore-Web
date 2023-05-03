import config from "./configuration.json";

export const defaultQueryOptions = {
  retry: config["ajax.retry.maxTimes"],
  retryDelay: config["ajax.retry.delay"],
};
