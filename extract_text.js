function extractTextFromGoogleDocsInAllFolders() {
  var projectFolder = DriveApp.getFolderById("1kceiYKqXIpwZIw6HcHDQaW82GJHOzPZ2");
  extractTextFromGoogleDocsInFolder(projectFolder);

  var subfolders = projectFolder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    extractTextFromGoogleDocsInFolder(subfolder);
  }
}

function extractTextFromGoogleDocsInFolder(folder) {
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() == MimeType.GOOGLE_DOCS) {
      var doc = DocumentApp.openById(file.getId());
      var text = doc.getBody().getText();
      Logger.log("Google Docs file: " + file.getName());
      Logger.log(text);
    }
  }
}