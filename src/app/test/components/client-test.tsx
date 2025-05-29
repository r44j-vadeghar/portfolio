"use client";

function ClientTest() {
  const handleLogoutClick = () => {
    console.log("Logout button clicked");

    // Check if we're in a browser environment with chrome extension API
    if (
      typeof window !== "undefined" &&
      window.chrome &&
      window.chrome.runtime
    ) {
      const deviceId = "your-device-id"; // You might want to get this dynamically

      chrome.runtime.sendMessage(
        "kgbcoelgfffkmkpfnldemdinmcbpjlaa",
        { type: "LOG_USER_OUT", data: { deviceId } },
        (response: { success?: boolean; error?: string }) => {
          if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError.message);
            alert("Please ensure the extension is installed and enabled.");
            return;
          }
          if (response.error) {
            console.error("Extension error:", response.error);
            alert("Failed to log user out on extension.");
          } else if (response.success) {
            alert(
              "We've logged you out from extension, please login again to have a premium experience"
            );
          }
        }
      );
    } else {
      alert(
        "Chrome extension API not available. Please test in Chrome with extension installed."
      );
    }
  };

  const handleOpenNewTabClick = () => {
    console.log("Open new tab button clicked");

    // Check if we're in a browser environment with chrome extension API
    if (
      typeof window !== "undefined" &&
      window.chrome &&
      window.chrome.runtime
    ) {
      chrome.runtime.sendMessage(
        "kgbcoelgfffkmkpfnldemdinmcbpjlaa",
        { type: "OPEN_NEW_TAB" },
        (response: { success?: boolean; error?: string }) => {
          if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError.message);
            alert("Please ensure the extension is installed and enabled.");
            return;
          }
          if (response.error) {
            console.error("Extension error:", response.error);
            alert("Failed to open the new tab page.");
          } else if (response.success) {
            console.log("New tab opened successfully");
            alert("New tab opened successfully");
          }
        }
      );
    } else {
      alert(
        "Chrome extension API not available. Please test in Chrome with extension installed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto p-8 text-center space-y-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Test Page</h1>

        <div className="space-y-4">
          <button
            onClick={handleLogoutClick}
            className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Log Out from Extension
          </button>

          <button
            onClick={handleOpenNewTabClick}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Open New Tab
          </button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Chrome Extension Test Page - Hidden from search engines
        </p>
      </div>
    </div>
  );
}

export default ClientTest;
