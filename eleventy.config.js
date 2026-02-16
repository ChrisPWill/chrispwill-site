// deno-lint-ignore no-import-prefix no-unversioned-import
import { HtmlBasePlugin } from "npm:@11ty/eleventy";
// deno-lint-ignore no-import-prefix no-unversioned-import
import { DateTime } from "npm:luxon";

// deno-lint-ignore no-import-prefix no-unversioned-import
import markdownIt from "npm:markdown-it";
// deno-lint-ignore no-import-prefix no-unversioned-import
import markdownItForInline from "npm:markdown-it-for-inline";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // 1. Copy CSS/font folder to _site/css
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");

  // 2. Add a readable date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const text = content.replace(/<[^>]*>/g, ""); // Strip HTML
    const words = text.split(/\s+/g).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
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

  const md = markdownIt();
  eleventyConfig.setLibrary(
    "md",
    md.use(
      markdownItForInline,
      "url_new_win",
      "link_open",
      function (tokens, idx) {
        const href = tokens[idx].attrGet("href");

        // Check if the link is external
        if (href && href.startsWith("http")) {
          tokens[idx].attrPush(["target", "_blank"]);
          tokens[idx].attrPush(["rel", "noopener noreferrer"]);
        }
      },
    ),
  );

  eleventyConfig.addGlobalData("buildTime", Date.now());

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
