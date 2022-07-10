// ========== IResponseResults

export interface IResponseResults {
	success: boolean;
	status: number;
	message: string;
	results?: typeof Array | Object;
	pageInfo?: {
		totalData: number;
		totalPages: number;
	}
}
