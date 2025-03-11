import { defineType } from "sanity";

export const tableType = defineType({
  name: "table",
  type: "object",
  title: "Table",
  fields: [
    {
      name: "rows",
      type: "array",
      title: "Rows",
      of: [
        {
          type: "object",
          name: "row",
          fields: [
            {
              name: "cells",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
});

export const embedType = defineType({
  name: "embed",
  type: "object",
  title: "Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "URL",
    },
    {
      name: "caption",
      type: "string",
      title: "Caption",
    },
  ],
});
