import { UserT, ForTokenUser } from "../types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};
const parseString = (val: unknown, name: string): string => {
	if (!val || !isString(val))
		throw new Error(`Incorect or missing ${name}: ${String(val)}`);
	return val;
};

export const toValidatedUser = (object: UserT): UserT => ({
	name: parseString(object.name, "name"),
	username: parseString(object.username, "username"),
	password: parseString(object.password, "password"),
});

export const toValidatedForTokenUser = (
	object: ForTokenUser
): ForTokenUser => ({
	username: parseString(object.username, "username"),
	password: parseString(object.password, "password"),
});
