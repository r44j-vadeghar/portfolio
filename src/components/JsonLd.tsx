import { JsonLdType } from "@/lib/seo/types";
import { FC } from "react";

interface JsonLdProps {
  data: JsonLdType | JsonLdType[];
}

const JsonLd: FC<JsonLdProps> = ({ data }) => {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </>
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
