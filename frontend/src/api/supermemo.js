export default function supermemo(
    quality,
    oldInterval,
    oldRepetitions,
    oldEaseFactor
) {
    if (oldRepetitions == null) oldRepetitions = 0;
    if (oldInterval == null) oldInterval = 0;
    if (oldEaseFactor == null) oldEaseFactor = 2.5;

    let interval = 0;
    let repetitions = 0;
    let easeFactor = 0;

    if (quality >= 3) {
        switch (oldRepetitions) {
            case 0:
                interval = 1;
                break;
            case 1:
                interval = 6;
                break;
            default:
                interval = Math.round(oldInterval * oldEaseFactor);
        }

        repetitions = oldRepetitions + 1;
    } else {
        repetitions = 0;
        interval = 1;
    }

    easeFactor =
        oldEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(easeFactor, 1.3);

    return {
        interval: interval,
        repetitions: repetitions,
        ease_factor: easeFactor,
    };
}
