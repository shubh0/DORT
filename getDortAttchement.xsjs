$.response.contentType = 'application/json';
var conn = $.db.getConnection();

var Query = 'SELECT SERIALNO,DORTID,ATTACHMENTDATA,FILETYPE,FILENAME,SHAREPOINTURL,ATTACHEDBYNAME,ATTACHEDBYID,ATTACHEDON FROM "DORT"."DORTATTACHMENTS"';
var DORTATTACHMENTS = conn.prepareStatement(Query);
var rs = DORTATTACHMENTS.executeQuery();
var drotacth={};
var atchData=[];
while (rs.next()) {
	drotacth={};
	drotacth.SERIALNO = rs.getInteger(1);
	drotacth.DORTID = rs.getInteger(2);
	drotacth.ATTACHMENTDATA = rs.getClob(3);
	drotacth.FILETYPE = rs.getString(4);
	drotacth.FILENAME = rs.getString(5);
	drotacth.SHAREPOINTURL = rs.getString(6);
	drotacth.ATTACHEDBYNAME = rs.getString(7);
	drotacth.ATTACHEDBYID = rs.getString(8);
	drotacth.ATTACHEDON = rs.getString(9).split('.')[0];
	atchData.push(drotacth);
	   	   
}

var allData = {
		
		DORTATTACHMENTS:atchData
		
		
};


rs.close();
DORTATTACHMENTS.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);


