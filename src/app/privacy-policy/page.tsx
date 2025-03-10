import fs from "fs/promises";
import path from "path";

export default async function LargeHTMLComponent() {
  const filePath = path.join(process.cwd(), "public", "privacy-policy.html");
  const htmlContent = await fs.readFile(filePath, "utf8");

  return (
    <div
      className="p-5 max-w-screen-2xl mx-auto"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
