$.response.contentType = 'application/json';
var transEnty={};
var transEntyArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT MERRICKID,COMPANYNAME,HAULERFLAG,TRANSPORTERFLAG,PURCHASERFLAG FROM "DORT"."BUSINESSENTITY" where "TRANSPORTERFLAG"=1 ';
var TRANSPORTER = conn.prepareStatement(Query);
var rs = TRANSPORTER.executeQuery();
while (rs.next()) {
	transEnty={};
	transEnty.MERRICKID = rs.getInteger(1);
	transEnty.COMPANYNAME = rs.getString(2);
	transEnty.HAULERFLAG = rs.getString(3);
	transEnty.TRANSPORTERFLAG = rs.getString(4);
	transEnty.PURCHASERFLAG = rs.getString(5);
	   
	transEntyArry.push(transEnty);
}


var allData = {
		
		TRANSPORTER:transEntyArry,
		
		
		
};


rs.close();
TRANSPORTER.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);
