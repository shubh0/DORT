$.response.contentType = 'application/json';
var ticketNo = $.request.parameters.get("ticketNo");
var tansportCompany = $.request.parameters.get("tansportCompany");
var Purchaser = $.request.parameters.get("Purchaser");
var CreatedDate = $.request.parameters.get("CreatedDate");
var conn = $.db.getConnection();
var atchData=[];
var output={};
var Query = 'SELECT d.DORTID,d.PURCHASER,d.HAULER,d.RUNTICKETNUMBER,d.GROSSBARRELS,d.CREATEDON,j.ATTACHMENTDATA FROM "DORT"."DORTHEADER" as d LEFT OUTER JOIN "DORT"."DORTATTACHMENTS" as j on d.DORTID = j.DORTID WHERE d.RUNTICKETNUMBER = ? OR d.HAULER =? OR d.PURCHASER =? OR d.CREATEDON=?';
var result = conn.prepareStatement(Query);
result.setString(1,ticketNo);
result.setString(2,tansportCompany);
result.setString(3,Purchaser);
result.setString(4,CreatedDate);

var rs = result.executeQuery();

while (rs.next()) {
	output={};
	   output.DORTID = rs.getInteger(1);
	   output.PURCHASER = rs.getInteger(2);
	   output.HAULER = rs.getInteger(3);
	   output.RUNTICKETNUMBER = rs.getString(4);
	   output.GROSSBARRELS = rs.getFloat(5);
	   output.CREATEDON = rs.getString(6).split('.')[0];
	   output.ATTACHMENTDATA = rs.getClob(7);
	   atchData.push(output);
	   	   
}

//var allData = {
//		
//		FDCREPORT:atchData
//		
//		
//};


rs.close();
//Query.close();
conn.close();
var resp=JSON.stringify(atchData);
$.response.setBody(resp);



