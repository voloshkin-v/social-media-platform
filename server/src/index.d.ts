export {};

declare global {
	namespace Express {
		export interface Request {
			isActivated?: boolean;
			userId?: string;
		}
	}
}
