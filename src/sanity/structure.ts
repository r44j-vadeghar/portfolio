import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("R44J CMS")
    .items([
      orderableDocumentListDeskItem({ type: "post", S, context }),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "category", "author"].includes(item.getId()!)
      ),
    ]);
