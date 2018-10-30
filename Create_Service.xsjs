var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);
var output = {};

function getDORTID()
{
       var dortId ;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select DORT.DORTID_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   dortId = rs.getString(1);
       }
       return dortId;
}

function getCommentSeq()
{
       var comSeq ;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select DORT.DORTCOM_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   comSeq = rs.getString(1);
       }
       return comSeq;
}

function getAttachementSeq()
{
       var atchSeq ;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select DORT.DORTCOM_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   atchSeq = rs.getString(1);
       }
       return atchSeq;
}

function getActivitySeq()
{
       var actSeq ;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select DORT.DORTACTIVITY_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   actSeq = rs.getString(1);
       }
       return actSeq;
}

function errorPrint(tableName, tableData, msg){
	var position = " ";
	if (msg.split("position")[1] && msg.split("position")[1].split(" is")[0]) {
		position = msg.split("position")[1].split(" is")[0];
	}
	position = position.trim();
	var objVal = tableData[position];
	var completeMsg = "Error at "+ tableName + " : " + objVal + " and  Message : " + msg;
	 $.response.setBody(completeMsg);
}

var conn;
var successFlag = true;

	try {
			if (ReqBody.DORTHEADER) {
		var DORTHEADER = "INSERT INTO \"DORT\".\"DORTHEADER\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		conn = $.hdb.getConnection();
		var dortId = getDORTID();
		conn.executeUpdate(DORTHEADER, dortId,
				ReqBody.DORTHEADER.MERRICKID,
				ReqBody.DORTHEADER.RUNOPENDATE,
				ReqBody.DORTHEADER.RUNOPENTIME,
				ReqBody.DORTHEADER.RUNCLOSEDATE,
				ReqBody.DORTHEADER.RUNCLOSETIME,
				ReqBody.DORTHEADER.PRODUCTCODE,
				ReqBody.DORTHEADER.DISPOSITIONCODE,
				ReqBody.DORTHEADER.PURCHASER,
				ReqBody.DORTHEADER.HAULER,
				ReqBody.DORTHEADER.RUNTICKETNUMBER,
				ReqBody.DORTHEADER.OPENODOMETER,
				ReqBody.DORTHEADER.CLOSEODOMETER,
				ReqBody.DORTHEADER.OPENTEMPERATURE,
				ReqBody.DORTHEADER.CLOSETEMPERATURE,
				ReqBody.DORTHEADER.TEMPERATURECOMPENSATION,
				ReqBody.DORTHEADER.LINETEMPERATURE,
				ReqBody.DORTHEADER.LACTMETERFACTOR,
				ReqBody.DORTHEADER.LACTCOMPRESSIBILITYFACTOR,
				ReqBody.DORTHEADER.GROSSBARRELS, 
				ReqBody.DORTHEADER.BSANDW,
				ReqBody.DORTHEADER.ACTUALGRAVITY,
				ReqBody.DORTHEADER.OBSERVEDTEMPERATURE,
				ReqBody.DORTHEADER.CONVERTEDGRAVITY,
				ReqBody.DORTHEADER.NETBARRELS,
				ReqBody.DORTHEADER.CREATEDBYNAME,
				ReqBody.DORTHEADER.CREATEDBYID, 
				ReqBody.DORTHEADER.CREATEDON,
				ReqBody.DORTHEADER.REVIEWEDBYNAME,
				ReqBody.DORTHEADER.REVIEWEDBYID,
				ReqBody.DORTHEADER.REVIEWEDON,
				ReqBody.DORTHEADER.HAULER_DES,
				ReqBody.DORTHEADER.PURCHASER_DES,
				ReqBody.DORTHEADER.DISPOSTION_DES,
				ReqBody.DORTHEADER.METERNAME

		);

	}
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("DORTHEADER", ["","dortId","MERRICKID","RUNOPENDATE","RUNOPENTIME","RUNCLOSEDATE",
		                           "RUNCLOSETIME","PRODUCTCODE","DISPOSITIONCODE","PURCHASER","HAULER","RUNTICKETNUMBER",
		                           "OPENODOMETER","CLOSEODOMETER","OPENTEMPERATURE","TEMPERATURECOMPENSATION",
		                           "LINETEMPERATURE","LACTMETERFACTOR","LACTCOMPRESSIBILITYFACTOR","GROSSBARRELS","BSANDW","ACTUALGRAVITY",
		                           "OBSERVEDTEMPERATURE","CONVERTEDGRAVITY","NETBARRELS","CREATEDBYNAME" ,"CREATEDBYID","CREATEDON","REVIEWEDBYNAME","REVIEWEDBYID","REVIEWEDON","HAULER_DES","PURCHASER_DES","DISPOSTION_DES","METERNAME"], e.message);
			
		 successFlag =false;
		
	}

	if (successFlag) {
		try {
			if (ReqBody.DORTCOMMENTS) {
				
				var DORTCOMMENTS = "INSERT INTO \"DORT\".\"DORTCOMMENTS\" VALUES (?,?,?,?,?,?)";
				var comSeq = getCommentSeq();
				conn.executeUpdate(DORTCOMMENTS, comSeq, dortId,
						ReqBody.DORTCOMMENTS.COMMENT,
						ReqBody.DORTCOMMENTS.COMMENTEDBYNAME,
						ReqBody.DORTCOMMENTS.COMMENTEDBYID,
						ReqBody.DORTCOMMENTS.COMMENTEDON);
			}
		} catch (e) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			errorPrint("DORTCOMMENTS", ["","comSeq","dortId","COMMENT","COMMENTEDBYNAME","COMMENTEDBYID","COMMENTEDON" ], e.message);
			
			successFlag =false;
			
		}
	}

	if (successFlag) {
		try {
					if (ReqBody.DORTACTIVITYLOG) {
			var DORTACTIVITYLOG = "INSERT INTO \"DORT\".\"DORTACTIVITYLOG\" VALUES (?,?,?,?,?,?)";
			var actSeq = getActivitySeq();
			conn.executeUpdate(DORTACTIVITYLOG, actSeq, dortId,
					ReqBody.DORTACTIVITYLOG.ACTIONTYPE,
					ReqBody.DORTACTIVITYLOG.ACTEDBYNAME,
					ReqBody.DORTACTIVITYLOG.ACTEDBYID,
					ReqBody.DORTACTIVITYLOG.ACTIONDATE);
		}
		} catch (e) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			errorPrint("DORTACTIVITYLOG", ["","actSeq","dortId","ACTIONTYPE","ACTEDBYNAME","ACTEDBYID","ACTIONDATE" ], e.message);
			
			successFlag =false;
		}
		
	}
		
		if (successFlag) {
					try {
					var maxlength=ReqBody.DORTATTACHMENTS.length;
		var attch = "",i,DORTATTACHMENTS;
		for(i=0;i<maxlength;i++){
			
			DORTATTACHMENTS = "INSERT INTO \"DORT\".\"DORTATTACHMENTS\" VALUES (?,?,?,?,?,?,?,?,?)";
			attch = getAttachementSeq();
			conn.executeUpdate(
					DORTATTACHMENTS, 
					attch, 
					dortId,
					ReqBody.DORTATTACHMENTS[i].ATTACHMENTDATA,
					ReqBody.DORTATTACHMENTS[i].FILETYPE,
					ReqBody.DORTATTACHMENTS[i].FILENAME,
					ReqBody.DORTATTACHMENTS[i].SHAREPOINTURL,
					ReqBody.DORTATTACHMENTS[i].ATTACHEDBYNAME,
					ReqBody.DORTATTACHMENTS[i].ATTACHEDBYID,
					ReqBody.DORTATTACHMENTS[i].ATTACHEDON);
			
		}
		} catch (e) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			errorPrint("DORTATTACHMENTS", ["","actSeq","dortId","ATTACHMENTDATA","FILETYPE","FILENAME","SHAREPOINTURL","ATTACHEDBYNAME","ATTACHEDBYID","ATTACHEDON" ], e.message);
			
			successFlag =false;
		}
		}
		
		if (successFlag) {
					var respMsg =+dortId + " created successfully"; 
		conn.commit();
		
		 output.Success = respMsg; // Append success message to output
	       output.dortId = dortId;// Append JSA Permit Number to output
		$.response.contentType = 'application/json ;charset=UTF-8';
		$.response.setBody(JSON.stringify(output));
		}
	
		

     conn.close();



