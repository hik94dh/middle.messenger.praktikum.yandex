export const redirectToPage = (status: number, path: string, isMainPage = false) => {
	if (status === 200 || (status === 401 && isMainPage)) {
		window.history.pushState({}, '', path);
		document.location.reload();
	}
	return;
};
