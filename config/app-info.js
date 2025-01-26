const Appconfig = {
    domainName: ""
}

if (process.env.NODE_ENV !== "development") {
    Appconfig.domainName = "https://4links.vercel.app";
} else {
    Appconfig.domainName = "http://localhost:3000";
}

export default Appconfig;
