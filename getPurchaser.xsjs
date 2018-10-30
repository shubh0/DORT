$.response.contentType = 'application/json';
var purEnty={};
var purEntyArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT MERRICKID,COMPANYNAME,HAULERFLAG,TRANSPORTERFLAG,PURCHASERFLAG FROM "DORT"."BUSINESSENTITY" where "PURCHASERFLAG"=1 ';
var PURCHASER = conn.prepareStatement(Query);
var rs = PURCHASER.executeQuery();
while (rs.next()) {
	purEnty={};
	purEnty.MERRICKID = rs.getInteger(1);
	purEnty.COMPANYNAME = rs.getString(2);
	purEnty.HAULERFLAG = rs.getString(3);
	purEnty.TRANSPORTERFLAG = rs.getString(4);
	purEnty.PURCHASERFLAG = rs.getString(5);
	   
	purEntyArry.push(purEnty);
}


var allData = {
		
		PURCHASER:purEntyArry,
		
		
		
};


rs.close();
PURCHASER.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);
