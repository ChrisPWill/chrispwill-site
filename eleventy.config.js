// deno-lint-ignore no-import-prefix no-unversioned-import
import { HtmlBasePlugin } from "npm:@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
