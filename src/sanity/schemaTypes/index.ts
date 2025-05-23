import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { postType } from "./postType";
import { productAssetType } from "./productAssetType";
import { productCategoryType } from "./productCategoryType";
import { productType } from "./productType";
import { salesType } from "./salesType";
import { youTubeType } from "./youTubeType";
import { embedType, tableType } from "./utilityTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    productType,
    productCategoryType,
    orderType,
    salesType,
    productAssetType,
    youTubeType,
    tableType,
    embedType,
  ],
};
