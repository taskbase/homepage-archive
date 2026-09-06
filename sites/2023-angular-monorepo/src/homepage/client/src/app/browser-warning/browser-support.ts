class Browser {
  name: string;
  oldestSupportedVersion: string;
}

export class UserBrowser {
  name: string;
  version: string;
}

const SUPPORTED_BROWSERS: Browser[] = [
  { name: "Chrome", oldestSupportedVersion: "48.0.2564" }, // Release: 2016-1-20
  { name: "Firefox", oldestSupportedVersion: "43.0.4" }, // Release: January 6, 2016
  { name: "Safari", oldestSupportedVersion: "10.0" }, // Release: September 20, 2016
  { name: "Opera", oldestSupportedVersion: "35" }, // Release: 2016-02-02
  { name: "MS-Edge", oldestSupportedVersion: "14.14393" }, // Release: August 2, 2016
  { name: "FB-Messanger", oldestSupportedVersion: "0" }, // No information found, support all
  { name: "Samsung", oldestSupportedVersion: "4" }, // Release: early 2016
  { name: "UC-Browser", oldestSupportedVersion: "11.0" }, // Release 2016-8-20
  { name: "Unknown", oldestSupportedVersion: "0" },
];

export function browserNoLongerSupported(userBrowser: UserBrowser) {
  return SUPPORTED_BROWSERS.map((browser) =>
    isBrowserAndOutdated(userBrowser, browser)
  ).includes(true);
}

function isBrowserAndOutdated(userBrowser: UserBrowser, browser: Browser) {
  return (
    userBrowser.name === browser.name &&
    !versionGreaterOrEqual(userBrowser.version, browser.oldestSupportedVersion)
  );
}

function versionGreaterOrEqual(version1: string, version2: string): boolean {
  const v1parts = version1.split(".");
  const v2parts = version2.split(".");

  for (let i = 0; i < v1parts.length; i++) {
    if (i === v2parts.length) {
      return true; // 10.2.3 >= 10.2 returns here
    } else if (v1parts[i] > v2parts[i]) {
      return true; // 10.3.4 >= 10.1.6 returns here
    } else if (v1parts[i] < v2parts[i]) {
      return false; // 10.2.4 >= 10.20.6 returns here
    }
  }
  if (v1parts.length === v2parts.length) {
    return true; // 10.2 >= 10.2 returns here
  } else {
    return false; // 10.2 >= 10.2.6 returns here
  }
}
