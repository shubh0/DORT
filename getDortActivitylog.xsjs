
$.response.contentType = 'application/json';
var drotlog = {};
var drotlogArray=[];
var conn = $.db.getConnection();

var Query = 'SELECT SERIALNO,DORTID,ACTIONTYPE,ACTEDBYNAME,ACTEDBYID,ACTIONDATE FROM "DORT"."DORTACTIVITYLOG"';
var DORTACTIVITYLOG = conn.prepareStatement(Query);
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
	
	drotlogArray.push(drotlog);
	   	   
}


var allData = {
		
		DORTACTIVITYLOG:drotlogArray
		
		
};


rs.close();
DORTACTIVITYLOG.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


