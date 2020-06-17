module.exports = {
    details(req) {
        console.log(req.hostname);
        console.log(req.ip);
        console.log(req.baseUrl);
        console.log(req.protocol);
        console.log(req.route);
        console.log(req.subdomain);
    }
}