function readTextFile(file)
{
	// nao funciona ...
	$.ajax({
		url: './text.txt',
		success: function (data){
			return data;
		}
	});
}
