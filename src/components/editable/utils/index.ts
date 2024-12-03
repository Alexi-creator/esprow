export const getPatternType = (val: string): 'email' | 'date' | 'textarea' | 'text' => {
	if (/^\S+@\S+\.\S+$/.test(val)) return 'email';
	if (!isNaN(Date.parse(val))) return 'date';
	if (val.length > 50) return 'textarea';
	return 'text';
};
