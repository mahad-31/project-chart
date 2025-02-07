import { Emotion } from "../models/emotion.model";
import { emitEmotionEvent, SOCKET_EVENTS } from "./socket.service";

interface EmotionStats {
    totalEmotions: number;
    totalGazing: number;
    emotionBreakdown: {
        Joy: number;
        Anger: number;
        Sadness: number;
        Disgust: number;
        Surprise: number;
        Neutral: number;
    };
}

export const calculateAndEmitEmotionStats = async () => {
    try {
        const allEmotions = await Emotion.find({});
        const stats: EmotionStats = {
            totalEmotions: 0,
            totalGazing: 0,
            emotionBreakdown: {
                Joy: 0,
                Anger: 0,
                Sadness: 0,
                Disgust: 0,
                Surprise: 0,
                Neutral: 0
            }
        };

        // Count total emotions
        stats.totalEmotions = allEmotions.length;

        // Count gazing instances
        stats.totalGazing = allEmotions.filter(e => e.gazing).length;

        // Calculate emotion breakdown with predefined categories
        allEmotions.forEach(emotion => {
            if (emotion.emotionName in stats.emotionBreakdown) {
                stats.emotionBreakdown[emotion.emotionName as keyof typeof stats.emotionBreakdown]++;
            }
        });

        // Emit stats through socket
        emitEmotionEvent(SOCKET_EVENTS.EMOTION_STATS, stats);

        return stats;
    } catch (error) {
        console.error('Error calculating emotion stats:', error);
        throw error;
    }
};

// Set up interval to update stats every minute
export const startEmotionStatsUpdates = () => {
    // Initial calculation
    calculateAndEmitEmotionStats();

    // Update every minute
    setInterval(calculateAndEmitEmotionStats, 60000);
};
