$.response.contentType = 'application/json';
var output = {};
var drotCom={};
var dortId = $.request.parameters.get("dortId");
var conn = $.db.getConnection();

var Query = 'SELECT DORTID, MERRICKID,RUNOPENDATE,RUNOPENTIME,RUNCLOSEDATE,RUNCLOSETIME,PRODUCTCODE,DISPOSITIONCODE,PURCHASER,HAULER,RUNTICKETNUMBER,OPENODOMETER,CLOSEODOMETER,OPENTEMPRATURE,CLOSETEMPRATURE,TEMPRATURECOMPENSATION,LINETEMPRATURE,LACTMETERFACTOR,LACTCOMPRESSIBILITYFACTOR,GROSSBARRELS,BSANDW,ACTUALGRAVITY,OBSERVEDTEMPRATURE,CONVERTEDGRAVITY,NETBARRELS,CREATEDBYNAME,CREATEDBYID,CREATEDON,REVIEWEDBYNAME,REVIEWEDBYID,REVIEWEDON,HAULER_DES,PURCHASER_DES,DISPOSTION_DES,METERNAME FROM "DORT"."DORTHEADER" WHERE DORTID = ?';
var DORTHEADER = conn.prepareStatement(Query);
DORTHEADER.setString(1,dortId);
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
	   output.OPENTEMPERATURE = rs.getFloat(14);
	   output.CLOSETEMPERATURE = rs.getFloat(15);
	   output.TEMPERATURECOMPENSATION = rs.getFloat(16);
	   output.LINETEMPERATURE = rs.getFloat(17);
	   output.LACTMETERFACTOR = rs.getFloat(18);
	   output.LACTCOMPRESSIBILITYFACTOR = rs.getFloat(19);
	   output.GROSSBARRELS = rs.getFloat(20);
	   output.BSANDW = rs.getFloat(21);
	   output.ACTUALGRAVITY = rs.getFloat(22);
	   output.OBSERVEDTEMPERATURE = rs.getFloat(23);
	   output.CONVERTEDGRAVITY = rs.getFloat(24);
	   output.NETBARRELS = rs.getFloat(25);
	   output.CREATEDBYNAME = rs.getString(26);
	   output.CREATEDBYID = rs.getString(27);
	   output.CREATEDON = rs.getString(28).split('.')[0];
	   output.REVIEWEDBYNAME = rs.getString(29);
	   output.REVIEWEDBYID = rs.getString(30);
	   output.REVIEWEDON = rs.getString(31).split('.')[0];
	   output.HAULER_DES = rs.getString(32);
	   output.PURCHASER_DES = rs.getString(33);
	   output.DISPOSTION_DES = rs.getString(34);
	   output.METERNAME = rs.getString(35);
	   	   
}

var Query = 'SELECT SERIALNO,DORTID,COMMENTS,COMMENTEDBYNAME,COMMENTEDBYID,COMMENTEDON FROM "DORT"."DORTCOMMENTS" WHERE DORTID = ?';
var DORTCOMMENTS = conn.prepareStatement(Query);
DORTCOMMENTS.setString(1,dortId);
var rs = DORTCOMMENTS.executeQuery();
while (rs.next()) {
	   drotCom={};
	   drotCom.SERIALNO = rs.getInteger(1);
	   drotCom.DORTID = rs.getInteger(2);
	   drotCom.COMMENTS = rs.getString(3);
	   drotCom.COMMENTEDBYNAME = rs.getString(4);
	   drotCom.COMMENTEDBYID = rs.getString(5);
	   drotCom.COMMENTEDON = rs.getString(6).split('.')[0]; 
}

var Query = 'SELECT SERIALNO,DORTID,ACTIONTYPE,ACTEDBYNAME,ACTEDBYID,ACTIONDATE FROM "DORT"."DORTACTIVITYLOG" WHERE DORTID = ?';
var DORTACTIVITYLOG = conn.prepareStatement(Query);
DORTACTIVITYLOG.setString(1,dortId);
var rs = DORTACTIVITYLOG.executeQuery();
var drotlog={};
while (rs.next()) {
	drotlog={};
	drotlog.SERIALNO = rs.getInteger(1);
	drotlog.DORTID = rs.getInteger(2);
	drotlog.ACTIONTYPE = rs.getString(3);
	drotlog.ACTEDBYNAME = rs.getString(4);
	drotlog.ACTEDBYID = rs.getString(5);
	drotlog.ACTIONDATE = rs.getString(6).split('.')[0];
	   	   
}


var Query = 'SELECT SERIALNO,DORTID,ATTACHMENTDATA,FILETYPE,FILENAME,SHAREPOINTURL,ATTACHEDBYNAME,ATTACHEDBYID,ATTACHEDON FROM "DORT"."DORTATTACHMENTS" WHERE DORTID = ?';
var DORTATTACHMENTS = conn.prepareStatement(Query);
DORTATTACHMENTS.setString(1,dortId);
var rs = DORTATTACHMENTS.executeQuery();
var drotacth={};
var atchData=[];
while (rs.next()) {
	drotacth={};
	drotacth.SERIALNO = rs.getInteger(1);
	drotacth.DORTID = rs.getInteger(2);
	drotacth.ATTACHMENTDATA = rs.getClob(3);
	drotacth.FILETYPE = rs.getString(4);
	drotacth.FILENAME = rs.getString(5);
	drotacth.SHAREPOINTURL = rs.getString(6);
	drotacth.ATTACHEDBYNAME = rs.getString(7);
	drotacth.ATTACHEDBYID = rs.getString(8);
	drotacth.ATTACHEDON = rs.getString(9).split('.')[0];
	atchData.push(drotacth);
	   	   
}

var allData = {
			
		DORTHEADER:output,
		DORTCOMMENTS:drotCom,
		DORTACTIVITYLOG:drotlog,
		DORTATTACHMENTS:atchData
		
		
};


rs.close();
DORTHEADER.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


