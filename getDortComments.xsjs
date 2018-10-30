$.response.contentType = 'application/json';
var drotCom={};
var drotArry=[];
var conn = $.db.getConnection();

var Query = 'SELECT SERIALNO,DORTID,COMMENTS,COMMENTEDBYNAME,COMMENTEDBYID,COMMENTEDON FROM "DORT"."DORTCOMMENTS"';
var DORTCOMMENTS = conn.prepareStatement(Query);
var rs = DORTCOMMENTS.executeQuery();
while (rs.next()) {
	   drotCom={};
	   drotCom.SERIALNO = rs.getInteger(1);
	   drotCom.DORTID = rs.getInteger(2);
	   drotCom.COMMENTS = rs.getString(3);
	   drotCom.COMMENTEDBYNAME = rs.getString(4);
	   drotCom.COMMENTEDBYID = rs.getString(5);
	   drotCom.COMMENTEDON = rs.getString(6).split('.')[0]; 
	   
	   drotArry.push(drotCom);
}


var allData = {
		
		DORTCOMMENTS:drotArry,
		
		
		
};


rs.close();
DORTCOMMENTS.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


