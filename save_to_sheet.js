function saveTextsToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["File Name", "Extracted Text"]);
  var projectFolder = DriveApp.getFolderById("1kceiYKqXIpwZIw6HcHDQaW82GJHOzPZ2");
  saveFolderDocsToSheet(projectFolder, sheet);

  var subfolders = projectFolder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    saveFolderDocsToSheet(subfolder, sheet);
  }
}

function saveFolderDocsToSheet(folder, sheet) {
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() == MimeType.GOOGLE_DOCS) {
      var doc = DocumentApp.openById(file.getId());
      var text = doc.getBody().getText();
      sheet.appendRow([file.getName(), text]);
    }
  }
}
