$.response.contentType = 'application/json';
var output = {};
var drotCom={};
var dortId = $.request.parameters.get("dortId");
var conn = $.db.getConnection();



var Query = 'SELECT SERIALNO FROM "DORT"."DORTCOMMENTS" WHERE DORTID = ?';
var DORTCOMMENTS = conn.prepareStatement(Query);
DORTCOMMENTS.setString(1,dortId);
var rs = DORTCOMMENTS.executeQuery();
while (rs.next()) {
	   drotCom={};
	   drotCom.SERIALNO = rs.getInteger(1);
	
}

var Query = 'SELECT SERIALNO FROM "DORT"."DORTACTIVITYLOG" WHERE DORTID = ?';
var DORTACTIVITYLOG = conn.prepareStatement(Query);
DORTACTIVITYLOG.setString(1,dortId);
var rs = DORTACTIVITYLOG.executeQuery();
var drotlog={};
while (rs.next()) {
	drotlog={};
	drotlog.SERIALNO = rs.getInteger(1);
	
}



var allData = {
			
		DORTCOMMENTS:drotCom,
		DORTACTIVITYLOG:drotlog,
		
		
		
};


rs.close();
DORTCOMMENTS.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


