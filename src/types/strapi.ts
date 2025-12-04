export interface StrapiAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    [key: string]: any;
}

export interface StrapiData<T = StrapiAttributes> {
    id: number;
    attributes: T;
}

export interface StrapiCollectionResponse<T = StrapiAttributes> {
    data: StrapiData<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiSingleResponse<T = StrapiAttributes> {
    data: StrapiData<T> | null;
    meta: object;
}

export interface StrapiMediaAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: StrapiMediaFormat;
        small?: StrapiMediaFormat;
        medium?: StrapiMediaFormat;
        large?: StrapiMediaFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
}

export interface StrapiMediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface StrapiMedia {
    data: StrapiData<StrapiMediaAttributes> | null;
}

export interface StrapiMediaArray {
    data: StrapiData<StrapiMediaAttributes>[] | null;
}
