export const newClientEmailTemplate = (receiver, client, advisor) => {
  return `
  <!DOCTYPE html>
  <html
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
  >
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!--[if mso
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:PixelsPerInch>96</o:PixelsPerInch
            ><o:AllowPNG /></o:OfficeDocumentSettings></xml
      ><![endif]-->
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato"
        rel="stylesheet"
        type="text/css"
      />
      <!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 595px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
  
          .row-2 .column-1 .block-1.paragraph_block td.pad,
          .row-4 .column-1 .block-1.paragraph_block td.pad {
            padding: 10px !important;
          }
  
          .row-1 .column-2 .block-1.heading_block td.pad {
            padding: 5px !important;
          }
  
          .row-1 .column-2 .block-1.heading_block h1 {
            font-size: 24px !important;
          }
        }
      </style>
    </head>
  
    <body
      style="
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        class="nl-container"
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #ffffff;
        "
      >
        <tbody>
          <tr>
            <td>
              <table
                class="row row-1"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000000;
                          width: 575px;
                        "
                        width="575"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="25%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="image_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      width: 100%;
                                      padding-right: 0px;
                                      padding-left: 0px;
                                    "
                                  >
                                    <div
                                      class="alignment"
                                      align="center"
                                      style="line-height: 10px"
                                    >
                                      <img
                                        src="https://res.cloudinary.com/dmykyluyo/image/upload/v1677511982/o9mimjcypseyel3nxtdq.jpg"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 93px;
                                          max-width: 100%;
                                        "
                                        width="93"
                                        alt="smol logo"
                                        title="smol logo"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="column column-2"
                              width="75%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="heading_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 30px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 32px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #8a3c90;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: center;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        ><span style="color: #006699"
                                          >SMOL QUICK RESPONSE TEAM</span
                                        ></span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-2"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000000;
                          width: 575px;
                        "
                        width="575"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="paragraph_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 15px;
                                      padding-left: 60px;
                                      padding-right: 60px;
                                      padding-top: 15px;
                                    "
                                  >
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: 'Helvetica Neue', Helvetica,
                                          Arial, sans-serif;
                                        font-size: 15px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 150%;
                                        text-align: left;
                                        mso-line-height-alt: 22.5px;
                                      "
                                    >
                                      <p style="margin: 0; margin-bottom: 5px">
                                        <strong
                                          ><span style="color: #006699"
                                            >${receiver.organizationName.toUpperCase()}</span
                                          ></strong
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        Beste
                                        <em><strong>${receiver.firstName} ${
    receiver.lastName
  }</strong></em
                                        >;
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        De volgende hulpvraag wordt gesteld:
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        &nbsp; &nbsp; &nbsp; &nbsp;
                                        <strong
                                          ><span style="color: #000000"
                                            >Vraag-Nummer:</span
                                          ></strong
                                        >
                                        <span style="color: #008080">${
                                          client.clientNumber
                                        }</span>
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        <strong
                                          >&nbsp; &nbsp; &nbsp; &nbsp;
                                          <span style="color: #000000"
                                            >Geslacht:</span
                                          ></strong
                                        >
                                        <span style="color: #008080"
                                          >${client.gender}<strong
                                            >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            &nbsp; &nbsp;
                                            <span style="color: #000000"
                                              >Leeftijd:</span
                                            ></strong
                                          ><span style="color: #008080"
                                            >${client.age}</span
                                          ></span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        <span style="color: #008080"
                                          ><strong
                                            >&nbsp; &nbsp; &nbsp; &nbsp;
                                            <span style="color: #000000"
                                              >Gemeente:&nbsp;</span
                                            ></strong
                                          ><span style="color: #000000"
                                            ><span style="color: #008080"
                                              >${client.municipality}</span
                                            ></span
                                          ></span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        <span style="color: #008080"
                                          ><strong
                                            >&nbsp; &nbsp; &nbsp; &nbsp;
                                            <span style="color: #000000"
                                              >Beperking:</span
                                            > </strong
                                          >${client.disabilityType} ${
    client.disability
  }</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        <span style="color: #008080"
                                          ><strong
                                            >&nbsp; &nbsp; &nbsp; &nbsp;
                                            <span style="color: #000000"
                                              >Categorie:</span
                                            > </strong
                                          >${client.category}</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 5px">
                                        <span style="color: #008080"
                                          ><strong
                                            >&nbsp; &nbsp; &nbsp; &nbsp;
                                            <span style="color: #000000"
                                              >Kernwoorden:</span
                                            > </strong
                                          >${client.keyWords.join()}</span
                                        >
                                      </p>
                                      <p style="margin: 0">
                                        <span style="color: #008080"
                                          ><strong
                                            >&nbsp; &nbsp; &nbsp; &nbsp;
                                            <span style="color: #000000"
                                              >Toelichting:</span
                                            > </strong
                                          >${
                                            client.extraInformation
                                              ? client.extraInformation
                                              : " "
                                          }</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-3"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000000;
                          width: 575px;
                        "
                        width="575"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="50%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="button_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="localhost://3000/kanhelpen" style="height:42px;width:150px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#59e03a"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><!
                                      [endif]--><a
                                        href="${
                                          process.env.HOST_NAME
                                        }email-reply/coordinator/${
    receiver._id
  }/client/${client._id}/1"
                                        target="_blank"
                                        style="
                                          text-decoration: none;
                                          display: block;
                                          color: #ffffff;
                                          background-color: #59e03a;
                                          border-radius: 4px;
                                          width: 50%;
                                          border-top: 0px solid transparent;
                                          font-weight: undefined;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                        ><span
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            font-size: 16px;
                                            display: inline-block;
                                            letter-spacing: normal;
                                          "
                                          ><span
                                            style="
                                              word-break: break-word;
                                              line-height: 32px;
                                            "
                                            dir="ltr"
                                            >Kan Helpen</span
                                          ></span
                                        ></a
                                      >
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="column column-2"
                              width="50%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="button_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="localhost:3000/niet-helpen" style="height:42px;width:150px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#e04e3a"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><!
                                      [endif]--><a
                                        href="${
                                          process.env.HOST_NAME
                                        }email-reply/coordinator/${
    receiver._id
  }/client/${client._id}/0"
                                        target="_blank"
                                        style="
                                          text-decoration: none;
                                          display: block;
                                          color: #ffffff;
                                          background-color: #e04e3a;
                                          border-radius: 4px;
                                          width: 50%;
                                          border-top: 0px solid transparent;
                                          font-weight: undefined;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                        ><span
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            font-size: 16px;
                                            display: inline-block;
                                            letter-spacing: normal;
                                          "
                                          ><span
                                            dir="ltr"
                                            style="
                                              margin: 0;
                                              word-break: break-word;
                                              line-height: 32px;
                                            "
                                            >Kan Niet</span
                                          ></span
                                        ></a
                                      >
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-4"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000000;
                          width: 575px;
                        "
                        width="575"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="paragraph_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 60px;
                                      padding-right: 60px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: 'Helvetica Neue', Helvetica,
                                          Arial, sans-serif;
                                        font-size: 15px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 150%;
                                        text-align: left;
                                        mso-line-height-alt: 22.5px;
                                      "
                                    >
                                      <p style="margin: 0; margin-bottom: 6px">
                                        Intaker:
                                        <span style="color: #008080"
                                          >${advisor?.firstName} ${
    advisor?.lastName
  }&nbsp;</span
                                        >
                                        &nbsp; &nbsp; &nbsp;
                                      </p>
                                      <p style="margin: 0; margin-bottom: 6px">
                                        Organisatie:
                                        <span style="color: #008080">${
                                          advisor?.organizationName
                                        }</span>
                                      </p>
                                      <p style="margin: 0; margin-bottom: 6px">
                                        Phone:
                                        <span style="color: #008080"
                                          >${advisor?.phone}</span
                                        >&nbsp; &nbsp; &nbsp; &nbsp;
                                      </p>
                                      <p style="margin: 0; margin-bottom: 6px">
                                        Email:
                                        <span style="color: #008080"
                                          >${advisor?.email}</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 6px">
                                        &nbsp;
                                      </p>
                                      <p style="margin: 0; margin-bottom: 6px">
                                        Met vriendelijke groet,
                                      </p>
                                      <p style="margin: 0; margin-bottom: 6px">
                                        Het QRS-Team
                                      </p>
                                      <p style="margin: 0">&nbsp;</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  

  `;
};
