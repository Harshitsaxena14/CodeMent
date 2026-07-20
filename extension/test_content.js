console.log("TEST CONTENT SCRIPT RUNNING!");
if (typeof document !== "undefined" && document.body) {
  document.body.setAttribute("data-codement-id", "test-id-123");
}
