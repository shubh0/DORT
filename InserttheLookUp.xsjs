function InsertTheLookUp(){

function errorPrint(tableName, tableData, msg) {
	var position = " ";
	if (msg.split("position")[1] && msg.split("position")[1].split(" is")[0]) {
		position = msg.split("position")[1].split(" is")[0];
	}
	position = position.trim();
	var objVal = tableData[position];
	var completeMsg = "Error at " + tableName + " : " + objVal
			+ " and  Message : " + msg;
	$.response.setBody(completeMsg);
}
var successFlag = true;
var destination;
var client;
destination = $.net.http.readDestination("DORT", "test_dest");
client = new $.net.http.Client();
// Specifying the entity name for the POST operation
var request = new $.net.http.Request($.net.http.POST, "/productCode/getProduct");
// Application content type
request.headers.set("Content-Type", "application/json");
//		  
// //setting the data to be created
request.setBody(JSON.stringify({
	"merrickIdList" : [2 ]
}));
client.request(request, destination);
// Checking the status ( 201 for success )
var response = {};
response = client.getResponse();
var responseData = JSON.parse(response.body.asString());
var proDuctDatalength = responseData.productCodeDtoList.length;
var i, PRODUCTCODE, DISPOSITIONCODE;
var conn = $.hdb.getConnection();
try {
	for (i = 0; i < proDuctDatalength; i++) {

		PRODUCTCODE = 'UPDATE "DORT"."PRODUCTCODE" SET  "PRODUCTTYPE"=?,"PRODUCTCODE"=?  where "MERRICKID"=?';
		conn.executeUpdate(PRODUCTCODE,
				responseData.productCodeDtoList[i].productTypeID,
				responseData.productCodeDtoList[i].productCodeShort,
				responseData.productCodeDtoList[i].merrickID);
	}
	} catch (e) {
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	errorPrint("PRODUCTCODE",
			[ "", "PRODUCTTYPE", "PRODUCTCODE", "MERRICKID" ], e.message);

	successFlag = false;
	}
//		
var request1 = new $.net.http.Request($.net.http.POST,
		"/dispositionCode/getDisposition");
request1.headers.set("Content-Type", "application/json");
request1.setBody(JSON.stringify({
	"merrickIdList" : [ 9,8 ]
}));
client.request(request1, destination);
//
var disPosition = {};
disPosition = client.getResponse();
var disPositionData = JSON.parse(disPosition.body.asString());
var dispositionlength = disPositionData.dispositionCodeDtoList.length;
if (successFlag) {
	//		
	try {
		for (i = 0; i < dispositionlength; i++) {

			DISPOSITIONCODE = 'UPDATE "DORT"."DISPOSITIONCODE" SET  "PRODUCTTYPE"=?,"DISPOSTIONCODE"=?  where "MERRICKID"=?';
			conn
					.executeUpdate(
							DISPOSITIONCODE,
							disPositionData.dispositionCodeDtoList[i].productTypeID,
							disPositionData.dispositionCodeDtoList[i].dispositionCodeShort,
							disPositionData.dispositionCodeDtoList[i].merrickID);
		}

	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		errorPrint("DISPOSITIONCODE", [ "", "PRODUCTTYPE", "DISPOSTIONCODE",
				"MERRICKID" ], e.message);

		successFlag = false;
	}

}

var request2 = new $.net.http.Request($.net.http.GET, "/businessEntity/fetchDt");
client.request2(request2, destination);

var businessEntity = {};
businessEntity = client.getResponse();
var businessEntityData = JSON.parse(businessEntity.body.asString());
var businessEntitylength = businessEntityData.businessEntityList.length;


var Query = "TRUNCATE TABLE \"DORT\".\"BUSINESSENTITY\"";
	conn.executeUpdate(Query);
var BUSINESSENTITY;
if (successFlag) {
	try {
			for (i = 0; i < businessEntitylength; i++){
		
		 BUSINESSENTITY = "INSERT INTO \"DORT\".\"BUSINESSENTITY\" VALUES (?,?,?,?,?)";
		conn.executeUpdate(BUSINESSENTITY,
				businessEntityData.businessEntityList[i].merrickID,
				businessEntityData.businessEntityList[i].companyName,
				businessEntityData.businessEntityList[i].haulerFlag,
				businessEntityData.businessEntityList[i].transporterFlag,
				businessEntityData.businessEntityList[i].purchaserFlag);
		
	}
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		errorPrint("BUSINESSENTITY", [ "", "MERRICKID", "COMPANYNAME",
				"HAULERFLAG","TRANSPORTERFLAG","PURCHASERFLAG" ], e.message);

		successFlag = false;
	}
}

var request3 = new $.net.http.Request($.net.http.GET, "/meterRest/fetchMeters");
client.request3(request3, destination);
var meterrest = {};
meterrest = client.getResponse();
var meterrestData = JSON.parse(meterrest.body.asString());
var meterrestlength = meterrestData.meterDtoList.length;

var Query1 = "TRUNCATE TABLE \"DORT\".\"DORTMERRICK\"";
conn.executeUpdate(Query1);
var DORTMERRICK;

if (successFlag) {
	
	try {
			for (i = 0; i < meterrestlength; i++){
		
				DORTMERRICK = "INSERT INTO \"DORT\".\"DORTMERRICK\" VALUES (?,?)";
		conn.executeUpdate(DORTMERRICK,
				meterrestData.meterDtoList[i].merrickID,
				meterrestData.meterDtoList[i].meterName);
				
		
	}
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		errorPrint("DORTMERRICK", [ "", "MERRICKID", "METERNAME"
				 ], e.message);

		successFlag = false;
	}
	
}

if (successFlag) {
	conn.commit();
		$.response.setBody(JSON.stringify("created successfully"));
}
}

// "Success" : response
//
// }));
