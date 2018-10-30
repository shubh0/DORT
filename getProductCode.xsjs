$.response.contentType = 'application/json';
var proCode={};
var proCodeArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT MERRICKID,PRODUCTTYPE,PRODUCTCODE FROM "DORT"."PRODUCTCODE"';
var PRODUCTCODE = conn.prepareStatement(Query);
var rs = PRODUCTCODE.executeQuery();
while (rs.next()) {
	proCode={};
	proCode.MERRICKID = rs.getInteger(1);
	proCode.PRODUCTTYPE = rs.getInteger(2);
	proCode.PRODUCTCODE = rs.getString(3);
	   
	proCodeArry.push(proCode);
}


var allData = {
		
		PRODUCTCODE:proCodeArry,
		
		
		
};


rs.close();
PRODUCTCODE.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);
