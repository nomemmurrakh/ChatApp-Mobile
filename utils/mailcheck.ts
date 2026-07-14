import * as Mailcheck from "mailcheck";

// Complete Mailcheck configuration for USA and Pakistan markets
const customMailcheckConfig = {
  // Second level domains (the part before the TLD)
  defaultSecondLevelDomains: [
    // Original defaults
    "yahoo",
    "hotmail",
    "mail",
    "live",
    "outlook",
    "gmx",
    // Major US/International providers
    "gmail",
    "aol",
    "icloud",
    "protonmail",
    "tutanota",
    "zoho",
    "yandex",
    "fastmail",
    "proton",
    "hey",
    // Pakistan-specific providers
    "cyber",
    "supernet",
    "ptcl",
    // International popular providers
    "163",
    "126",
    "qq",
    "naver",
    "daum",
    "inbox",
    // Business/Enterprise
    "office365",
    "exchange",
    "business",

    //Others
    "yopmail"
  ],

  // Top level domains
  defaultTopLevelDomains: [
    // Original defaults
    "com",
    "com.au",
    "com.tw",
    "ca",
    "co.nz",
    "co.uk",
    "de",
    "fr",
    "it",
    "ru",
    "net",
    "org",
    "edu",
    "gov",
    "jp",
    "nl",
    "kr",
    "se",
    "eu",
    "ie",
    "co.il",
    "us",
    "at",
    "be",
    "dk",
    "hk",
    "es",
    "gr",
    "ch",
    "no",
    "cz",
    "in",
    "net.au",
    "info",
    "biz",
    "mil",
    "co.jp",
    "sg",
    "hu",
    "uk",
    // Pakistan-specific TLDs
    "pk",
    "com.pk",
    "net.pk",
    "org.pk",
    "edu.pk",
    "gov.pk",
    // Modern popular TLDs
    "io",
    "co",
    "me",
    "tv",
    "cc",
    "ly",
    "app",
    "dev",
    "tech",
    "online",
    "site",
    "website",
    "store",
    "shop",
    "blog",
    // Additional useful TLDs
    "mobi",
    "name",
    "tel",
    "pro",
    "xyz",
    "club",
    "world",
  ],

  // Complete domain list (original + additions)
  defaultDomains: [
    // Original domains
    "msn.com",
    "bellsouth.net",
    "telus.net",
    "comcast.net",
    "optusnet.com.au",
    "earthlink.net",
    "qq.com",
    "sky.com",
    "icloud.com",
    "mac.com",
    "sympatico.ca",
    "googlemail.com",
    "att.net",
    "xtra.co.nz",
    "web.de",
    "cox.net",
    "gmail.com",
    "ymail.com",
    "aim.com",
    "rogers.com",
    "verizon.net",
    "rocketmail.com",
    "google.com",
    "optonline.net",
    "sbcglobal.net",
    "aol.com",
    "me.com",
    "btinternet.com",
    "charter.net",
    "shaw.ca",

    // Major US providers
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "protonmail.com",
    "tutanota.com",
    "zoho.com",
    "fastmail.com",
    "yandex.com",
    "hey.com",
    "mail.com",
    "gmx.com",
    "inbox.com",

    // Pakistan-specific domains
    "cyber.net.pk",
    "supernet.pk",
    "ptcl.net.pk",
    "uu.net.pk",
    "comsats.net.pk",
    "ndu.edu.pk",
    "lums.edu.pk",

    // International popular domains
    "163.com",
    "126.com",
    "sina.com",
    "sohu.com",
    "naver.com",
    "daum.net",
    "mail.ru",
    "rambler.ru",

    // Business/Enterprise
    "office365.com",
    "exchange.com",
    "business.com",

    // Modern providers
    "proton.me",
    "duck.com",
    "tutanota.de",

    // Others
    "yopmail.com"
  ],
};

export const suggestEmailCorrection = (
  email: string
): Promise<string | null> => {
  return new Promise((resolve) => {
    Mailcheck.run({
      domains: customMailcheckConfig.defaultDomains,
      topLevelDomains: customMailcheckConfig.defaultTopLevelDomains,
      secondLevelDomains: customMailcheckConfig.defaultSecondLevelDomains,
      email: email,
      suggested: (suggestion: MailSuggestion) => {
        resolve(`Did you mean \'${suggestion.full}\'?`);
      },
      empty: () => {
        resolve(null);
      },
    });
  });
};
