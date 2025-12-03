export type ResumenBannerType = "Principal" | "Editorial" | "Saltillo" | "Dinero" | "Especial" | "Opinión" | "Columna";

export interface ResumenArticle {
    id: string;
    title: string;
    imageUrl: string;
    banner: ResumenBannerType;
    summary?: string;
    content?: string;
    author?: string; // For opinion pieces
    audioUrl?: string;
}

export interface ResumenPodcast {
    id: string;
    title: string;
    duration: string;
    audioUrl: string;
    imageUrl: string;
    description?: string;
    date?: string;
}

export interface ResumenPhoto {
    id: string;
    title: string;
    imageUrl: string;
    photographer?: string;
}

export interface ResumenCartoon {
    id: string;
    title: string;
    imageUrl: string;
    artist?: string;
}
