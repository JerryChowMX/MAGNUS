# Strapi Adapter Layer Implementation Plan

## Goal
Implement an Adapter Layer to integrate Strapi CMS without modifying existing UI components.

## Steps

1.  **Define Strapi Types**
    *   Create `src/types/strapi.ts`.
    *   Define generic `StrapiResponse<T>`, `StrapiData<T>`, `StrapiAttributes`.
    *   Define `StrapiMedia` structure.

2.  **Create Media Utility**
    *   Create `src/utils/media.ts`.
    *   Implement `getStrapiMedia(url: string)`:
        *   If URL is absolute (starts with `http` or `//`), return as is.
        *   If URL is relative, prepend `VITE_STRAPI_URL`.

3.  **Update/Create API Client**
    *   Analyze `src/api/apiClient.ts`.
    *   Ensure it can handle Bearer tokens from `VITE_STRAPI_TOKEN`.
    *   Optionally create `src/api/strapiClient.ts` if the existing client is too specific to the old API.

4.  **Implement Service Adapter**
    *   Modify `src/services/resumenApi.ts`.
    *   Import Strapi types and `getStrapiMedia`.
    *   Implement `normalizeResumenArticle(item: StrapiResumenArticle): ResumenArticle`.
    *   Update `fetchResumenArticles` (or equivalent) to fetch from Strapi and map the data using the normalizer.

5.  **Environment Configuration**
    *   Remind user to set `VITE_STRAPI_URL` and `VITE_STRAPI_TOKEN` in `.env`.

## Verification
*   **Type Check**: Ensure no TS errors in new files.
*   **Unit Test (Manual)**: Verify `getStrapiMedia` returns correct URLs.
*   **Integration**: Since we don't have a live Strapi instance connected yet, we will verify the *code structure* and *types*.
