//////////////////////////////////////////////////////////////////////
/* set your doc and sheet info */
const URL = "your doc url"
const SHEET_ID = "your sheeet id"
const RESULT_SHEET_NAME = "your sheeet name"
const COMMENT_RESULT_SHEET_NAME = "your sheeet name for comment"

/////////////////////////////////////////////////////////////////////

// get reply count per comment
function getResult() {
    var url = URL
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(RESULT_SHEET_NAME)
    
    try{
      var fileid = DocumentApp.openByUrl(url).getId();
    }
    catch(e){
      console.error(url);
    }
    
    var nextPageToken = "first"
    var comments =Drive.Comments.list(fileid, {'maxResults':100});
    for(var i=0; i<100; i++){
      if (nextPageToken==="first") {
        console.log("first page")
      }
      for (var j=0; j<comments.items.length; j++) {
        var itm = comments.items[j]
        a = [itm.createdDate, itm.htmlContent, itm.author.displayName,itm.replies.length]
        sheet.appendRow(a)
      }
      nextPageToken=comments.nextPageToken
      if(nextPageToken==null) {
        console.log("last page")
        break
      }
      comments =Drive.Comments.list(fileid, {'maxResults':100,'pageToken':nextPageToken});
    }
}
  
// get all comments and reply comments
function getCommentResult() {
    var url = URL
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(COMMENT_RESULT_SHEET_NAME)
    
    try{
      var fileid = DocumentApp.openByUrl(url).getId();
    }
    catch(e){
      console.error(url);
    }
    
    var nextPageToken = "first"
    var comments =Drive.Comments.list(fileid, {'maxResults':100});
    for(var i=0; i<100; i++){
      if (nextPageToken==="first") {
        console.log("first page")
      }
      for (var j=0; j<comments.items.length; j++) {
        var itm = comments.items[j]
        a = [itm.createdDate, itm.htmlContent, itm.author.displayName,itm.replies.length]
        sheet.appendRow(a)
        for (var k=0; k<itm.replies.length; k++) {
          var rep = itm.replies[k]
          a = [rep.createdDate, rep.htmlContent, rep.author.displayName]
          sheet.appendRow(a)
        }
      }
      nextPageToken=comments.nextPageToken
      if(nextPageToken==null) {
        console.log("last page")
        break
      }
      comments =Drive.Comments.list(fileid, {'maxResults':100,'pageToken':nextPageToken});
    }
}