export const visitKey = {
  pagePath: (path: string) => `visits:page:path:${path}`,
  pageTotal: () => `visits:page:all`,
  pageDate: () => `visits:page:date:${new Date().toISOString().split("T")[0]}`,

  apiPath: (path: string) => `visits:api:path:${path}`,
  apiTotal: () => `visits:api:all`,
  apiDate: () => `visits:api:date:${new Date().toISOString().split("T")[0]}`,
};
