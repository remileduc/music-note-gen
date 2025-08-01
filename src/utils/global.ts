export const basePath = process.env.NEXT_PUBLIC_BASEPATH ?? "" as const;

export const SYSTEM_WIDTH = 350 as const;
export const SYSTEM_HEIGHT = 200 as const;

export function rsrcPath(path: string)
{
	return basePath + path;
}

export function getSVGHeight(systemNumber: number, clientWidth: number, systemWidth: number, systemHeight: number) : number
{
	return systemHeight * Math.ceil(systemNumber / Math.max(1, Math.floor(clientWidth / systemWidth)));
}
