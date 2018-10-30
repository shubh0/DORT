$.response.contentType = 'application/json';
var disCode={};
var disCodeCodeArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT MERRICKID,PRODUCTTYPE,DISPOSTIONCODE FROM "DORT"."DISPOSITIONCODE"';
var DISPOSITIONCODE = conn.prepareStatement(Query);
var rs = DISPOSITIONCODE.executeQuery();
while (rs.next()) {
	disCode={};
	disCode.MERRICKID = rs.getInteger(1);
	disCode.PRODUCTTYPE = rs.getInteger(2);
	disCode.DISPOSTIONCODE = rs.getString(3);
	   
	disCodeCodeArry.push(disCode);
}


var allData = {
		
		DISPOSITIONCODE:disCodeCodeArry,
		
		
		
};


rs.close();
DISPOSITIONCODE.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);
