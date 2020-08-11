function getNowDate (){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	return new Date(year,month,day);
}
function addDay(dateTime, days){
	var date = dateTime;
	var times = date.getTime() + days * 24 * 60 * 60 * 1000;
	return new Date(times);
}
export default {
	getNowDate,
	addDay
	
}