// deno-lint-ignore no-import-prefix no-unversioned-import
import { HtmlBasePlugin } from "npm:@11ty/eleventy";
// deno-lint-ignore no-import-prefix no-unversioned-import
import { DateTime } from "npm:luxon";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // 1. Copy CSS folder to _site/css
  eleventyConfig.addPassthroughCopy("src/css");

  // 2. Add a readable date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    const isDev = Deno.env.get("ELEVENTY_ENV") === "dev";

    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .filter((post) => {
        if (post.data.published) {
          return true;
        }

        return isDev;
      });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
