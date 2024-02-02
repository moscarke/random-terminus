let url = "https://rt.data.gov.hk/v2/transport/citybus/route/ctb";
let xhttpr = new XMLHttpRequest();
xhttpr.open("GET", url, true);

xhttpr.send();
let terminus = [];
const hkiList = [];
const klnList = [];
const nteList = [];
const ntwList = [];

xhttpr.onload = ()=> {
	if (xhttpr.status == 200){
		const response = JSON.parse(xhttpr.response);
		const list = response["data"];
		for (let i = 0; i < list.length; i++){
			terminus.push(list[i]["orig_tc"] + "</td><td> - </td><td>" + list[i]["route"]);
			terminus.push(list[i]["dest_tc"] + "</td><td> - </td><td>" + list[i]["route"]);
		}
		/*let x = "<tr><td>" + removeDuplicates(terminus).join("</td></tr><tr><td>") + "</td></tr>";
		
		document.getElementById("listTable").innerHTML = x;
		document.getElementById("routeList").style.display = "block";
		document.getElementById("waiting").style.display = "none";*/
	} else {
		//idk do sth
	}
}

url = "https://data.etabus.gov.hk/v1/transport/kmb/route/";
xhttpr = new XMLHttpRequest();
xhttpr.open("GET", url, true);

xhttpr.send();

xhttpr.onload = ()=> {
	if (xhttpr.status == 200){
		const response = JSON.parse(xhttpr.response);
		const list = response["data"];
		for (let i = 0; i < list.length; i++){
			terminus.push(list[i]["orig_tc"] + "</td><td> - </td><td>" + list[i]["route"]);
			terminus.push(list[i]["dest_tc"] + "</td><td> - </td><td>" + list[i]["route"]);
		}
		//terminus = removeDuplicates(terminus);
		let x = "<tr><td>" + terminus.join("</td></tr><tr><td>") + "</td></tr>";
		
		findFourStops();
		
		document.getElementById("listTable").innerHTML = x;
		//document.getElementById("routeList").style.display = "block";
		document.getElementById("waiting").style.display = "none";
	} else {
		//idk do sth
	}
}

function findFourStops(){
	let random;
	const station = [];
	for (let i = 0; i < 4; i++){
		random = Math.floor(Math.random() * terminus.length);
		station.push(terminus[random]);
	}
	let x = "<tr><td>" + station.join("</td></tr><tr><td>") + "</td></tr>";
	
	document.getElementById("stationTable").innerHTML = x;
	document.getElementById("stationList").style.display = "block";
	document.getElementById("routeList").style.display = "none";
	document.getElementById("waiting").style.display = "none";
}


/*let apiReceived = 0;

function getDistrict(){
	for (let i = 0; i < terminus.length; i++){
		processDistrictData(terminus[i])
	}
}

function processDistrictData(stopName){
	url = "https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=" + stopName;
	xhttpr = new XMLHttpRequest();
	xhttpr.open("GET", url, true);
	
	xhttpr.send();

	xhttpr.onload = ()=> {
		if (xhttpr.readyState == 4 && xhttpr.status == 200 && xhttpr.response != "" && xhttpr.response != null){
			let response = JSON.parse(xhttpr.response);
			let districtName = response[0]["districtZH"];
			console.log(url)
			console.log(stopName, districtName);
			
			if (districtName == "灣仔" || districtName == "東區" || districtName == "中西區" || districtName == "南區"){
				hkiList.push(stopName);
			} else if (districtName == "西貢" || districtName == "沙田" || districtName == "大埔" || districtName == "北區"){
				nteList.push(stopName);
			} else if (districtName == "元朗" || districtName == "屯門" || districtName == "荃灣" || districtName == "葵青" || districtName == "離島"){
				ntwList.push(stopName);
			} else {
				klnList.push(stopName);
			}
			apiReceived++
			if (apiReceived == terminus.length){
				let x = "<tr><td><b>HONG KONG ISLAND</b></td></tr><tr><td>" + hkiList.join("</td></tr><tr><td>") + "</td></tr>";
				x = x + "<tr><td><b>KOWLOON</b></td></tr><tr><td>" + klnList.join("</td></tr><tr><td>") + "</td></tr>";
				x = x + "<tr><td><b>NT EAST</b></td></tr><tr><td>" + nteList.join("</td></tr><tr><td>") + "</td></tr>";
				x = x + "<tr><td><b>NT WAST</b></td></tr><tr><td>" + ntwList.join("</td></tr><tr><td>") + "</td></tr>";
			
				document.getElementById("stationTable").innerHTML = x;
				document.getElementById("routeList").style.display = "block";
				document.getElementById("waiting").style.display = "none";
			}
		} else {
			//idk do sth
		}
	}
}*/

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}