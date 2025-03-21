import type { Context } from "hono";
import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";
import githubDriver from "unstorage/drivers/github";

export const helloUnstorage = async (c: Context) => {
  const storage = createStorage({
    //@ts-ignore
    driver: redisDriver({
      url: process.env.REDIS_URL,
    }),
  });

  const item1 = await storage.getItem("hello"); // or storage.getItem('/foo/bar')
  const item2 = await storage.getItem("visits:date:api:2025-03-21");
  const item3 = await storage.getItem("unstorage-1");
  const item4 = await storage.getItem<Date>("unstorage-1");
  const has = await storage.hasItem("unstorage-1");
  const set1Rs = await storage.setItem("unstorage-1", new Date());
  const keys = await storage.getKeys("visits:date");

  console.log("mount github");
  storage.mount(
    "/github",
    //@ts-ignore
    githubDriver({
      repo: "codecrafters-io/build-your-own-x",
      branch: "master",
    })
  );
  const ghKeys = await storage.getKeys("github");
  const get1Meta = await storage.getMeta("github:README.md");
  const itemGhREADME = await storage.getItem<Date>("github:.gitattributes");

  return c.json({
    item1,
    item2,
    item3,
    typeof_item4: typeof item4,
    has,
    set1Rs,
    get1Meta,
    keys,
    ghKeys,
    itemGhREADME,
  });
};
