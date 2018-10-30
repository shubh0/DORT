$.response.contentType = 'application/json';
var output = {};
var dortId = $.request.parameters.get("dortId[]");
var conn = $.db.getConnection();
var c,Query,rs,DORTHEADER;
for ( c = 0; c< dortId.length; c++){
	
	 Query = 'SELECT DORTID, MERRICKID,RUNOPENDATE FROM "DORT"."DORTHEADER" WHERE DORTID = ?';
		
		 DORTHEADER = conn.prepareStatement(Query);
		DORTHEADER.setString(1,dortId);
	 rs = DORTHEADER.executeQuery();
	while (rs.next()) {
		output={};
		   output.DORTID = rs.getInteger(1);
		   output.MERRICKID = rs.getInteger(2);
		   output.RUNOPENDATE = rs.getString(3);
		  
		   	   
	}

}

var allData = {
		
		DORTHEADER:output
		
		
};


rs.close();
DORTHEADER.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


