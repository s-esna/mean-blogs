import * as rateLimiter from 'express-rate-limit'

export const limiter =  rateLimiter.rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 15, 
	standardHeaders: 'draft-7',
	message: "You tried too many times to Login. Try again later (<=15 mins)"
})