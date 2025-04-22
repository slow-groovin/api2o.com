import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type DataType = {
  _id: string,
  title: string,
  description: string,
  tags: string[],
  date: string,
  _locale: 'zh' | 'en'
  url: string,
}
const MAX_COUNT = 200;


beginGenRss();

function beginGenRss() {
  const { enBlogs, zhBlogs } = getBlogs()


  const enRss = generateRss({
    blogs: enBlogs,
    title: 'blogs',
    locale: 'en-US',
  });
  const zhRss = generateRss({
    blogs: zhBlogs,
    title: '博客',
    locale: 'zh-CN',
  });

  writeFileSync("public/rss-api2o-blog-en.xml", enRss)
  writeFileSync("public/rss-api2o-blog-zh.xml", zhRss)
}

export function getBlogs() {
  const baseUrl = "https://www.api2o.com";

  //blogs
  const blogPaths = getMarkdownFilePaths("content/blog", ".md");
  const blogData = blogPaths
    .map((p) => `content/blog/${p}.md`)
    .map((path) => {
      const fileContent = readFileSync(path, "utf-8");
      const parsed = matter(fileContent);
      const { _locale, _id, date: dateStr } = parsed.data;
      const url = `${baseUrl}/${_locale}/blog/${_id}`;
      const date = new Date(dateStr).toUTCString()
      return {
        ...parsed.data,
        url,
        date
      } as any as DataType
    });
  const zhBlogs = blogData.filter(item => item._locale === 'zh').sort((a, b) => a.date < b.date ? -1 : 1).slice(0, MAX_COUNT);
  const enBlogs = blogData.filter(item => item._locale === 'en').sort((a, b) => a.date < b.date ? -1 : 1).slice(0, MAX_COUNT);
  return { zhBlogs, enBlogs }
}

function generateRss(input: { blogs: DataType[], title: string, locale: string, }): string {
  const { blogs, locale, title } = input
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"  xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>api2o.com ${title}</title>
  <link>https://www.api2o.com</link>
  <description>api2o.com ${title} RSS Feed</description>
  <language>${locale}</language> 
  <pubDate>${blogs[0].date}</pubDate>
`;
  const footer = `
</channel>
</rss>`;

  const items = blogs
    .map(({ url, title, description, date, tags }) => {
      return `  <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${description}</description>
      <pubDate>${date}</pubDate>
    </item>
`;
    })
    .join("");

  return header + items + footer;
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
