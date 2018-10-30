$.response.contentType = 'application/json';
var output = {};
var dortArray=[];
var conn = $.db.getConnection();

var Query = 'SELECT DORTID, MERRICKID,RUNOPENDATE,RUNOPENTIME,RUNCLOSEDATE,RUNCLOSETIME,PRODUCTCODE,DISPOSITIONCODE,PURCHASER,HAULER,RUNTICKETNUMBER,OPENODOMETER,CLOSEODOMETER,OPENTEMPRATURE,CLOSETEMPRATURE,TEMPRATURECOMPENSATION,LINETEMPRATURE,LACTMETERFACTOR,LACTCOMPRESSIBILITYFACTOR,GROSSBARRELS,BSANDW,ACTUALGRAVITY,OBSERVEDTEMPRATURE,CONVERTEDGRAVITY,NETBARRELS,CREATEDBYNAME,CREATEDBYID,CREATEDON,REVIEWEDBYNAME,REVIEWEDBYID,REVIEWEDON FROM "DORT"."DORTHEADER"';
var DORTHEADER = conn.prepareStatement(Query);
var rs = DORTHEADER.executeQuery();
while (rs.next()) {
	output={};
	   output.DORTID = rs.getInteger(1);
	   output.MERRICKID = rs.getInteger(2);
	   output.RUNOPENDATE = rs.getString(3);
	   output.RUNOPENTIME = rs.getString(4);
	   output.RUNCLOSEDATE = rs.getString(5);
	   output.RUNCLOSETIME = rs.getString(6);
	   output.PRODUCTCODE = rs.getInteger(7);
	   output.DISPOSITIONCODE = rs.getInteger(8);
	   output.PURCHASER = rs.getInteger(9);
	   output.HAULER = rs.getInteger(10);
	   output.RUNTICKETNUMBER = rs.getString(11);
	   output.OPENODOMETER = rs.getFloat(12);
	   output.CLOSEODOMETER = rs.getFloat(13);
	   output.OPENTEMPRATURE = rs.getFloat(14);
	   output.CLOSETEMPRATURE = rs.getFloat(15);
	   output.TEMPRATURECOMPENSATION = rs.getFloat(16);
	   output.LINETEMPRATURE = rs.getFloat(17);
	   output.LACTMETERFACTOR = rs.getFloat(18);
	   output.LACTCOMPRESSIBILITYFACTOR = rs.getFloat(19);
	   output.GROSSBARRELS = rs.getFloat(20);
	   output.BSANDW = rs.getFloat(21);
	   output.ACTUALGRAVITY = rs.getFloat(22);
	   output.OBSERVEDTEMPRATURE = rs.getFloat(23);
	   output.CONVERTEDGRAVITY = rs.getFloat(24);
	   output.NETBARRELS = rs.getFloat(25);
	   output.CREATEDBYNAME = rs.getString(26);
	   output.CREATEDBYID = rs.getString(27);
	   output.CREATEDON = rs.getString(28).split('.')[0];
	   output.REVIEWEDBYNAME = rs.getString(29);
	   output.REVIEWEDBYID = rs.getString(30);
	   output.REVIEWEDON = rs.getString(31).split('.')[0];  
	   dortArray.push(output);
}

var allData = {
		
		DORTHEADER:dortArray
		
		
};


rs.close();
DORTHEADER.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


