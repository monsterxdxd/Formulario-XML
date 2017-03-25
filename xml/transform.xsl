<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>
<style rel="stylesheet" type="text/css">
body{background-color:#B2EBF2;font-size: 1.3vw;}
h2{margin-left:10%;color:#00838F;margin-top:2%;}
table{width:80%;margin-left:10%;border-radius:10px 10px 10px 10px;border:3px solid;color:#B2EBF2}
th{background-color:#00838F;color:#E0F7FA;}
td{background-color:#00ACC1;}
td,tr,th{border-radius:12px 12px 12px 12px;border:5px solid;border-color:#B2EBF2;padding:8px;vertical-align:top}
</style>
</head>
  <body>
  <h2>Questions</h2>
  <table border="1">
    <tr bgcolor="#cdd8f6">
      <th>Title</th>
      <th>Option</th>
      <th>Answer</th>
    </tr>
    <xsl:for-each select="questions/question">
    <tr>
      <td><xsl:value-of select="title"/></td>
      <td>
       <xsl:for-each select="option">
        <xsl:value-of select="position()"/>: <xsl:value-of select="text()"/><br/>
       </xsl:for-each>
      </td>
      <td>
       <xsl:for-each select="answer">
        <xsl:value-of select="text()"/><br/>
       </xsl:for-each>       
      </td>
    </tr>
    </xsl:for-each>
  </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
