$.response.contentType = 'application/json';
var busEnty={};
var busEntyArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT MERRICKID,COMPANYNAME,HAULERFLAG,TRANSPORTERFLAG,PURCHASERFLAG FROM "DORT"."BUSINESSENTITY"';
var BUSINESSENTITY = conn.prepareStatement(Query);
var rs = BUSINESSENTITY.executeQuery();
while (rs.next()) {
	busEnty={};
	busEnty.MERRICKID = rs.getInteger(1);
	busEnty.COMPANYNAME = rs.getString(2);
	busEnty.HAULERFLAG = rs.getString(3);
	busEnty.TRANSPORTERFLAG = rs.getString(4);
	busEnty.PURCHASERFLAG = rs.getString(5);
	   
	busEntyArry.push(busEnty);
}


var allData = {
		
		BUSINESSENTITY:busEntyArry,
		
		
		
};


rs.close();
BUSINESSENTITY.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);
