$.response.contentType = 'application/json';
var merrickid = $.request.parameters.get("merrickid");
var atchData=[];
var output={};
var conn = $.db.getConnection();
var Query = 'SELECT FACILITYSUPERVISOREMAIL,USER_ID FROM "DORT"."FACILITYSUPERLIST" where MERRICKID=?';
var result = conn.prepareStatement(Query);
result.setString(1,merrickid);
var rs = result.executeQuery();

while (rs.next()) {
	output={};
	   output.FACILITYSUPERVISOREMAIL = rs.getString(1).trim();
	   output.USER_ID = rs.getString(2).trim();
	  
	   atchData.push(output);
	   	   
}


//var result=atchData.length;
//var userID,i;
//var array=[];
//
//for (i = 0; i < result; i++){
//	
////	
//	 userID=atchData[i].USER_ID;
//	 array.push({"userid":userID});
//}
////

rs.close();
//Query.close();
conn.close();
var resp=JSON.stringify(atchData);
$.response.setBody(resp);

