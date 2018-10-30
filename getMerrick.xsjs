$.response.contentType = 'application/json';
var dortMerrick={};
var dortMerrickArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT MERRICKID,METERNAME FROM "DORT"."DORTMERRICK"';
var DORTMERRICK = conn.prepareStatement(Query);
var rs = DORTMERRICK.executeQuery();
while (rs.next()) {
	dortMerrick={};
	dortMerrick.MERRICKID = rs.getInteger(1);
	dortMerrick.PRODUCTTYPE = rs.getString(2);
	   
	dortMerrickArry.push(dortMerrick);
}


var allData = {
		
		DORTMERRICK:dortMerrickArry,
		
		
		
};


rs.close();
DORTMERRICK.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);