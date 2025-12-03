import React from 'react';
import { Stack } from '../../../components/Layout';
import { Headline, Body, Caption } from '../../../components/Typography/Typography';
import type { ResumenPodcast } from '../types/resumen.types';
import './ResumenPodcastPlayer.css';

export interface ResumenPodcastPlayerProps {
    podcast: ResumenPodcast;
}

export const ResumenPodcastPlayer: React.FC<ResumenPodcastPlayerProps> = ({ podcast }) => {
    return (
        <div className="resumen-podcast-player">
            <img src={podcast.imageUrl} alt={podcast.title} className="resumen-podcast-player__image" />
            <div className="resumen-podcast-player__controls">
                <Stack spacing="md" align="center">
                    <Headline level={3}>{podcast.title}</Headline>
                    <Body>{podcast.description}</Body>
                    <Caption>Duration: {podcast.duration}</Caption>
                    <audio controls src={podcast.audioUrl} className="resumen-podcast-player__audio">
                        Your browser does not support the audio element.
                    </audio>
                </Stack>
            </div>
        </div>
    );
};
