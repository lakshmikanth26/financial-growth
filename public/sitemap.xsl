<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>BharatFin - XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            color: #545353;
            background: #f8f9fa;
            margin: 0;
            padding: 20px;
          }
          table {
            border: none;
            border-collapse: collapse;
            width: 100%;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          th {
            background: #00C896;
            color: white;
            font-weight: normal;
            padding: 12px;
            text-align: left;
          }
          td {
            padding: 8px 12px;
            border-bottom: 1px solid #f0f0f0;
          }
          tr:hover td {
            background: #f8f9fa;
          }
          .url {
            color: #1a73e8;
            text-decoration: none;
          }
          .url:hover {
            text-decoration: underline;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
          }
          .info {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #00C896;
          }
        </style>
      </head>
      <body>
        <h1>BharatFin XML Sitemap</h1>
        <div class="info">
          This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs for Google Search Console indexing.
        </div>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Change Frequency</th>
            <th>Priority</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td>
                <a href="{sitemap:loc}" class="url">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td>
                <xsl:value-of select="sitemap:lastmod"/>
              </td>
              <td>
                <xsl:value-of select="sitemap:changefreq"/>
              </td>
              <td>
                <xsl:value-of select="sitemap:priority"/>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>