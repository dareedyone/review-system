/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const info = (params: any): void => {
	console.log(...params);
};

export const error = (...params: any): void => {
	console.error(...params);
};
