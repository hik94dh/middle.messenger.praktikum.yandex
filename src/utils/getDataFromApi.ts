export const getDataFromApi = (status: number, response: string) => {
	if (status === 200 && response) {
		return JSON.parse(response);
	}
	return [];
};
