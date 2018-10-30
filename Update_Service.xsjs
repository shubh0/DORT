var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);

function errorPrint(tableName, tableData, msg){
	var position = " ";
	if (msg.split("position")[1] && msg.split("position")[1].split(" is")[0]) {
		position = msg.split("position")[1].split(" is")[0];
	}
	position = position.trim();
	var objVal = tableData[position];
	var completeMsg = "Error at "+ tableName + " : " + objVal + " and  Message : " + msg;
	 $.response.setBody(completeMsg);
}
var conn;
var successFlag = true;

try {
		   	if (ReqBody.DORTHEADER) {
						   	var DORTHEADER = 'UPDATE "DORT"."DORTHEADER" SET   "REVIEWEDBYNAME"=?,"REVIEWEDBYID"=?,"REVIEWEDON"=?  where "DORTID"=?';
   	 conn = $.hdb.getConnection();
   		
   		conn.executeUpdate(
   				DORTHEADER,
   				ReqBody.DORTHEADER.REVIEWEDBYNAME,
   				ReqBody.DORTHEADER.REVIEWEDBYID,
   				ReqBody.DORTHEADER.REVIEWEDON,
   				ReqBody.DORTHEADER.DORTID
   				
   		);
			}
   		
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("DORTHEADER", ["","REVIEWEDBYNAME","REVIEWEDBYID","REVIEWEDON","DORTID"], e.message);
			
		 successFlag =false;
		
	}
	
	
	if (successFlag) {
		
		var i ;
    	var DORTCOMMENTS;
    	var maxlength=ReqBody.DORTCOMMENTS.length;
		try {
			
				for(i=0;i<maxlength;i++) {
				 DORTCOMMENTS = 'UPDATE "DORT"."DORTCOMMENTS" SET   "COMMENTS"=?,"COMMENTEDBYNAME"=?,"COMMENTEDBYID"=?,"COMMENTEDON"=?  where "SERIALNO"=?';
				conn.executeUpdate(DORTCOMMENTS, 
						ReqBody.DORTCOMMENTS[i].COMMENT,
						ReqBody.DORTCOMMENTS[i].COMMENTEDBYNAME,
						ReqBody.DORTCOMMENTS[i].COMMENTEDBYID,
						ReqBody.DORTCOMMENTS[i].COMMENTEDON,
						ReqBody.DORTCOMMENTS[i].SERIALNO);
			}
				
			}
		catch (e) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			errorPrint("DORTCOMMENTS", ["","COMMENT","COMMENTEDBYNAME","COMMENTEDBYID","COMMENTEDON","SERIALNO" ], e.message);
			
			successFlag =false;
			
		}
	}
	
if (successFlag) {
		
		var i ;
    	var DORTACTIVITYLOG;
    	var maxlength=ReqBody.DORTACTIVITYLOG.length;
		try {
			
				for(i=0;i<maxlength;i++) {
					DORTACTIVITYLOG = 'UPDATE "DORT"."DORTACTIVITYLOG" SET   "ACTIONTYPE"=?,"ACTEDBYNAME"=?,"ACTEDBYID"=?,"ACTIONDATE"=?  where "SERIALNO"=?';
				conn.executeUpdate(DORTACTIVITYLOG, 
						ReqBody.DORTACTIVITYLOG[i].ACTIONTYPE,
						ReqBody.DORTACTIVITYLOG[i].ACTEDBYNAME,
						ReqBody.DORTACTIVITYLOG[i].ACTEDBYID,
						ReqBody.DORTACTIVITYLOG[i].ACTIONDATE,
						ReqBody.DORTACTIVITYLOG[i].SERIALNO);
			}
				
			}
		catch (e) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			errorPrint("DORTCOMMENTS", ["","ACTIONTYPE","ACTEDBYNAME","ACTEDBYID","ACTIONDATE","SERIALNO" ], e.message);
			
			successFlag =false;
			
		}
	}

if (successFlag) {
	var destination;
	var client;
	destination = $.net.http.readDestination("DORT", "test_dest");
	client = new $.net.http.Client();
	var request = new $.net.http.Request($.net.http.POST, "/meterRunTicket/create");
	request.headers.set("Content-Type", "application/json");
	
	request.setBody(JSON.stringify({
		"merrickId" : ReqBody.merrickId,
		"runOpenDate":ReqBody.runOpenDate,
		"runOpenTime":ReqBody.runOpenTime,
		"runCloseDate":ReqBody.runCloseDate,
		"runCloseTime":ReqBody.runCloseTime,
		"productCode":ReqBody.productCode,
		"dispositionCode":ReqBody.dispositionCode,
		"purchaser":ReqBody.purchaser,
		"hauler":ReqBody.hauler,
		"runTicketNumber":ReqBody.runTicketNumber,
		"closeOdometer":ReqBody.closeOdometer,
		"openTemperature":ReqBody.openTemperature,
		"closeTemperature":ReqBody.closeTemperature,
		"lactMeterFactor":ReqBody.lactMeterFactor,
		"lactCompressibilityFactor":ReqBody.lactCompressibilityFactor,
		"grossBarrels":ReqBody.grossBarrels,
		"bsandW":ReqBody.bsandW,
		"actualGravity":ReqBody.actualGravity,
		"observedTemperature":ReqBody.observedTemperature,
		"netBarrels":ReqBody.netBarrels
		
		
		
	}));
	
	client.request(request, destination);
	var response = {};
	response = client.getResponse();
	
	var responseData = response.body.asString();
	
	//var result = response.responseMessage.message;
	
	
}
	
	if (successFlag) {
		var respMsg = " Updated successfully"; 
conn.commit();
$.response.contentType = 'application/json ;charset=UTF-8';
$.response.setBody(JSON.stringify(
	{
		"Success": respMsg,
		
	}
));
}



conn.close();
