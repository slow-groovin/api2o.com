import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
/**
 * Mannually generate sitemap.xml
 */

beginGenSitemap();

function beginGenSitemap() {
  const allUrls = getAllUrls();
  const sitemap = generateSitemap(allUrls);
  writeFileSync("public/sitemap.xml", sitemap);
}

export function getAllUrls() {
  const baseUrl = "https://www.api2o.com";

  //blogs
  const blogPaths = getMarkdownFilePaths("content/blog", ".md");
  const blogUrls = blogPaths
    .map((p) => `content/blog/${p}.md`)
    .map((path) => {
      const fileContent = readFileSync(path, "utf-8");
      const parsed = matter(fileContent);
      const { _locale, _id } = parsed.data;
      return `${baseUrl}/${_locale}/blog/${_id}`;
    });

  //handbook 内容
  const handbookPaths = getMarkdownFilePaths("content/handbook", ".md");
  const handbookUrls = handbookPaths
    .map((p) => ({
      path: `content/handbook/${p}.md`,
      book: p.split("/")[0],
    }))
    .map((p) => {
      const fileContent = readFileSync(p.path, "utf-8");
      const parsed = matter(fileContent);
      const { _locale, _id } = parsed.data;
      return `${baseUrl}/${_locale}/handbook/${p.book}/${_id}`;
    })
    .filter((p) => !p.endsWith("/index"));

  //从page/tool目录读取
  const toolsPaths = getMarkdownFilePaths("pages/tool", ".vue");
  const zhToolUrls = toolsPaths
    .filter((path) => path !== "index")
    .map((path) => `${baseUrl}/zh/tool/${path}`);
  const enToolUrls = toolsPaths
    .filter((path) => path !== "index")
    .map((path) => `${baseUrl}/en/tool/${path}`);

  //从api目录读取
  const apiPaths = getMarkdownFilePaths("pages/api", ".vue");
  const zhApiUrls = apiPaths
    .filter((path) => path !== "index")
    .map((path) => `${baseUrl}/zh/api/${path}`);
  const enApiUrls = apiPaths
    .filter((path) => path !== "index")
    .map((path) => `${baseUrl}/en/api/${path}`);

  const otherUrls = ["llm.txt"].map((url) => `${baseUrl}/${url}`);
  return [
    ...blogUrls,
    ...handbookUrls,
    ...zhToolUrls,
    ...enToolUrls,
    ...zhApiUrls,
    ...enApiUrls,
    ...otherUrls,
  ];
}

function generateSitemap(urls: string[]) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  const footer = `</urlset>`;

  const body = urls
    .map((url) => {
      return `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
    })
    .join("");

  return header + body + footer;
}

/**
 * 从dir中递归读取所有的suffix后缀的文件的路径(relative, 不带后缀), 把路径中的\替换为/
 */
function getMarkdownFilePaths(dir: string, suffix: string): string[] {
  let results: string[] = [];

  function walk(directory: string) {
    const files = readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        // 递归进入子目录
        walk(filePath);
      } else if (stat.isFile() && file.endsWith(suffix)) {
        // 获取相对路径，并去掉文件后缀名 '.md'
        const relativePath = path
          .relative(dir, filePath)
          .replace(new RegExp(`${suffix}$`), "");
        results.push(relativePath);
      }
    });
  }

  walk(dir);
  return results.map((s) => s.replace(/\\/g, "/"));
}
