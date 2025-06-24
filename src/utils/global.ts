export const basePath = process.env.NEXT_PUBLIC_BASEPATH ?? "";

export function rsrcPath(path: string)
{
	return basePath + path;
}
