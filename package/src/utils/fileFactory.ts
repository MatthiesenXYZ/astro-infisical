/**
 * Factory function to create a file
 */
export const fileFactory = () => {
	let file = '';

	return {
		addLines(lines: string) {
			file += lines;
		},
		text() {
			return file;
		},
	};
};
