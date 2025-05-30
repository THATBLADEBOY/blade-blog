const READING_SPEED_WPM = 265 // average reading speed in words per minute
const IMAGE_TIME_START = 12 // seconds for first image
const IMAGE_TIME_MIN = 3 // minimum seconds per image
const IMAGE_TIME_DECREMENT = 1 // decrement per image
const IMAGE_WORDS_ADJUST = 4 // words to subtract per image

/**
 * Estimates the read time for a given content string.
 * @param content The blog post content
 * @returns Read time string (e.g., '3 min read')
 */
export function estimateReadTime(content: string): string {
  const WPS = READING_SPEED_WPM / 60
  let images = 0
  const regex = /\w/

  const words = content.split(' ').filter((word) => {
    if (word.includes('<img')) {
      images += 1
    }
    return regex.test(word)
  }).length

  let imageAdjust = images * IMAGE_WORDS_ADJUST
  let imageSecs = 0
  let imageFactor = IMAGE_TIME_START
  let imagesLeft = images

  while (imagesLeft) {
    imageSecs += imageFactor
    if (imageFactor > IMAGE_TIME_MIN) {
      imageFactor -= IMAGE_TIME_DECREMENT
    }
    imagesLeft -= 1
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60)
  return `${minutes} min read`
}
