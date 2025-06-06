export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-08";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_PROJECT_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
