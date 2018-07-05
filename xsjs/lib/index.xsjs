$.response.contentType = "text/html";
var body = "";

var hdrs = $.request.headers;
var host = "";
var hostname = "";

for (var i=0; i<hdrs.length; i++) {
	if (hdrs[i].name === "host") {
		host = hdrs[i].value;
		break;
	}	
}

console.log("Request: " + JSON.stringify($.request.cookies));

hostname = (host.split(":"))[0];

body += "<html>\n";
body += "<head>\n";
body += "</head>\n";
body += "<body style=\"font-family: Tahoma, Geneva, sans-serif\">\n";
body += "<a href=\"sensors.xsodata/$metadata\">Metadata</a><br />\n";
body += "<a href=\"sensors.xsodata/?$format=json\">Service Doc</a><br />\n";
body += "<a href=\"sensors.xsodata/temp/?$top=5&$format=json\">Top 5 Temps</a><br />\n";
body += "<a href=\"sensors.xsodata/temp(1)/?$format=json\">First Temp</a><br />\n";
body += "<a href=\"sensors.xsodata/temp/?$format=json\">All Temps</a><br />\n";
body += "<a href=\"sensors.xsodata/temp/?$format=json&$filter=tempVal gt 99\">Temps > 99</a><br />\n";
body += "<a href=\"sensors.xsodata/temp/?$format=json&$filter=tempVal gt 99&$select=tempId,tempVal\">Temps > 99 no Time Fields</a><br />\n";
body += "<!-- <a href=\"sensors.xsodata/tempNoTS/?$format=json\">Temps View no Timestamps( > 99 via structured privilege)</a><br /> -->\n";
body += "<a href=\"test_post.xsjs\" target=\"post\">Post Temp</a><br />\n";
body += "<br />\n";
body += "<br />\n";
body += "In order to grant a DB user access to this app's HDI container, follow these steps.<br />\n";
body += "<ul>\n";
body += "<li>If needed, create a new DB user by logging into the XS-C Security interface with the SYSTEM user.  <a href=\"https://" + hostname + ":4300/sap/hana/ide/security/\" target=\"security\">Security Console</a></li>\n";
body += "<li>Verify you can log in with that DB user here. <a href=\"https://" + hostname + ":4300/sap/hana/xs/formLogin/\" target=\"login\">Login</a></li>\n";
body += "<li>Continuing as the SYSTEM user, Create a new role called <strong>minreq_glue</strong> and grant to it the role <strong>DAT368.db.roles::iot_admin</strong>.</li>\n";
body += "<li>Grant the DB user the <strong>sap.hana.xs.ide.roles::CatalogDeveloper</strong> role and the <strong>minreq_glue</strong> role. Note: You can't grant the DAT368.db.roles::iot_admin role directly.</li>\n";
body += "<li>Now as the DB user (not SYSTEM), open the <a href=\"https://" + hostname + ":4300/sap/hana/ide/catalog/\" target=\"catalog\">Catalog Console</a></li>\n";
body += "<li>Expand the Calalog and the DAT368_HDI_CONTAINER_1 schema, notice that table <strong>DAT368.db.data::sensors.temp</strong> is available.</li>\n";
body +="</ul>\n";
body += "<br />\n";
body += "</body>\n";
body += "</html>\n";

$.response.setBody(body);
