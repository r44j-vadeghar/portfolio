import { defineField, defineType } from "sanity";

export const tableType = defineType({
  name: "table",
  type: "object",
  title: "Table",
  fields: [
    defineField({
      name: "csvData",
      type: "text",
      title: "Table Data (CSV)",
      description:
        "Paste CSV data here. Comma-separated values, one row per line.",
    }),
    defineField({
      name: "hasHeader",
      type: "boolean",
      title: "First Row is Header",
      description: "Enable if the first row should be treated as a header row",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      csvData: "csvData",
      hasHeader: "hasHeader",
    },
    prepare({ csvData, hasHeader }) {
      const rowCount = csvData
        ? csvData.split("\n").filter((line: string) => line.trim() !== "")
            .length
        : 0;
      const headerText = hasHeader && rowCount > 0 ? " (with header)" : "";
      return {
        title: `Table (${rowCount} rows${headerText})`,
      };
    },
  },
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
