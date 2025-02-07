const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  basename: "",
  defaultPath: "/dashboard",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:8000",
  outPath: process.env.REACT_APP_OUT_PATH || "/",
  isProduction: process.env.NODE_ENV === "production",
};

export default config;
