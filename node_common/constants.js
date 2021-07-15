export const POLLING_RATE = 5000;
export const MAX_BUCKET_COUNT = 100;
export const POWERGATE_HOST = "https://grpcweb.slate.textile.io";
export const IPFS_GATEWAY_URL = "https://slate.textile.io/ipfs";
export const FILE_STORAGE_URL = "./public/static/files/";
export const GITHUB_URL = "https://github.com/filecoin-project/slate";
export const ANALYTICS_URL = "https://slate-stats-dev.azurewebsites.net/";

// NOTE(toast): 30 GB from jim/martina/ignacio
export const TEXTILE_ACCOUNT_BYTE_LIMIT = 1073741824 * 30;

// NOTE(jim): 30 GB - minus .textileseed
export const TEXTILE_BUCKET_LIMIT = TEXTILE_ACCOUNT_BYTE_LIMIT - 234;

// NOTE(jim): 100mb
export const MIN_ARCHIVE_SIZE_BYTES = 104857600;

// NOTE(amine): 15 minutes
export const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

export const userPreviewProperties = ["users.id", "users.data", "users.username"];
