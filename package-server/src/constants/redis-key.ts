export const visitKey = {
  pagePath: (path: string) => `visits:page:${path}`,
  pageTotal: () => `visits:page:all`,
  pageDate: () => `visits:date:page:${new Date().toISOString().split("T")[0]}`,

  apiPath: (path: string) => `visits:api:${path}`,
  apiTotal: () => `visits:api:all`,
  apiDate: () => `visits:date:api:${new Date().toISOString().split("T")[0]}`,
};
