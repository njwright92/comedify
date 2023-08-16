async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Triangles/comedian_4000_gpt_only",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "Can you please let us know more details about your "}).then((response) => {
	console.log(JSON.stringify(response));
});