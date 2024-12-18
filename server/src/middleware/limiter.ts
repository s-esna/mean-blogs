/**
 * Middleware to apply rate-limiting for preventing brute-force attacks or excessive requests.
 * This middleware uses `express-rate-limit` to limit the number of requests a user can make 
 * within a specified window (e.g., 15 minutes). If a user exceeds the limit, they are provided 
 * with a message to inform them that they have made too many attempts.
 * 
 * @import { rateLimit }: Express rate-limiting library that helps prevent too many requests in a short time span.
 * 
 * @constant limiter: A configured rate-limiter middleware that restricts a user to a maximum of 15 requests 
 *                    within a 15-minute window (900,000 milliseconds). The middleware responds with a standard error message 
 *                    if the limit is exceeded.
 * 
 * @property windowMs - The time window (in milliseconds) for counting the number of requests. Set to 15 minutes (15 * 60 * 1000).
 * @property limit - The maximum number of requests allowed within the time window. Set to 15 requests.
 * @property standardHeaders - Specifies that the standard draft-7 headers should be included in the response.
 * @property message - The error message returned if the user exceeds the rate limit. Informs the user to try again later (within 15 minutes).
 * 
 * @see express-rate-limit documentation (https://www.npmjs.com/package/express-rate-limit) for additional configuration options.
 */


import * as rateLimiter from 'express-rate-limit'

export const limiter =  rateLimiter.rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 15, 
	standardHeaders: 'draft-7',
	message: "You tried too many times to Login. Try again later (<=15 mins)"
})