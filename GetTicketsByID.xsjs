$.response.contentType = 'application/json';
var DORTTickets = [];
var createdByID = $.request.parameters.get("createdByID");
var conn = $.db.getConnection();

try{
var Query = 'SELECT DORTID,RUNTICKETNUMBER,GROSSBARRELS,CREATEDBYNAME,CREATEDON,DISPOSTION_DES FROM "DORT"."DORTHEADER" WHERE CREATEDBYID = ? order by CREATEDON desc';
var DORTHEADER = conn.prepareStatement(Query);
DORTHEADER.setString(1,createdByID);
var rs = DORTHEADER.executeQuery();
var output = {};
while (rs.next()) {
	output={};
	   output.DORTID = rs.getInteger(1);
	   
	
	   output.RUNTICKETNUMBER = rs.getString(2);
	  
	   output.GROSSBARRELS = rs.getFloat(3);
	   
	   output.CREATEDBYNAME = rs.getString(4);
	  
	   output.CREATEDON = rs.getString(5).split('.')[0];
	   output.DISPOSTION_DES = rs.getString(6);
	   DORTTickets.push(output);
	   
	   	   
}




rs.close();
DORTHEADER.close();
conn.close();
var resp=JSON.stringify(DORTTickets);
$.response.setBody(resp);

}

catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setbody= e.message();
}


