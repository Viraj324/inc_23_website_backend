import path from "path";
import { readFileSync } from "fs";
import PdfPrinter from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import { changeCase } from "../../utils/index.js";

const __dirname = path.resolve();
var fonts = {
  Roboto: {
    italics: Buffer.from(
      readFileSync(__dirname + "/static/ArialItalic.ttf"),
      "base64"
    ),
  },
  Times: {
    normal: "Times-Roman",
    bold: "Times-Bold",
    italics: "Times-Italic",
    bolditalics: "Times-BoldItalic",
  },
};

const printer = new PdfPrinter({
  vfs: pdfFonts.pdfMake.vfs,
  ...fonts,
});

function createSynopsis(projects, event_name) {
  const AD = projects["APPLICATION DEVELOPMENT"];
  const CN = projects["COMMUNICATION NETWORKS AND SECURITY SYSTEMS"];
  const DS = projects["DIGITAL / IMAGE/ SPEECH / VIDEO PROCESSING"];
  const ES = projects["EMBEDDED/VLSI SYSTEMS"];
  const ML = projects["MACHINE LEARNING AND PATTERN RECOGNITION"];
  const OT = projects["OTHERS"];

  const docDefinition = {
    permissions: {
      printing: "highResolution", //'lowResolution'
      modifying: false,
      copying: false,
      annotating: true,
      fillingForms: true,
      contentAccessibility: true,
      documentAssembly: true,
    },

    header: function () {
      return [
        {
          columns: [
            {
              text: "Pune Institute of Computer Technology, Pune-43",
              fontSize: 10,
              italics: "true",
              alignment: "left",
            },
            {
              text: `${event_name} Synopsis: InC 2024`,
              fontSize: 10,
              italics: "true",
              alignment: "right",
            },
          ],
          margin: [50, 20, 50, 0],
        },
        ,
        {
          canvas: [
            {
              type: "line",
              x1: 50,
              y1: 10,
              x2: 595 - 50,
              y2: 10,
              lineWidth: 1,
            },
          ],
        },
      ];
    },
    footer: function (currentPage, pageCount) {
      return [
        {
          canvas: [
            {
              type: "line",
              x1: 50,
              y1: 10,
              x2: 595 - 30,
              y2: 10,
              lineWidth: 1,
            },
          ],
        },
        {
          text: currentPage.toString(),
          fontSize: 10,
          italics: "true",
          alignment: "center",
          margin: [30, 10, 30, 0],
        },
      ];
    },
    content: [
      // toc header
      {
        toc: {
          title: {
            text: "Contents".toUpperCase(),
            style: "header",
            alignment: "center",
            fontSize: 24,
            fontWeight: "bold",
            margin: [10, 10],
            marginBottom: 40,
          },
          textMargin: [5, 5, 5, 5],
          //textStyle: {italics: true},
          numberStyle: { bold: true },
          numberMargin: [10, 10, 10, 10],
          pagebreak: "after",
        },
      },
      // toc section
      {
        text: "Application development, Database, System Applications, Big Data".toUpperCase(),
        fontSize: 18,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },
      // toc sub-sections
      ...AD.map((project) => [
        {
          text: `${project.pid} : ${changeCase("sentence", project.title)}`,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [10, 0, 0, 0],
          marginBottom: 8,
          tocStyle: { fontSize: 12, alignment: "justify", marginBottom: 10 },
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.abstract.trim()}`,
              fontSize: 12,
              width: "auto",
              alignment: "justify",
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),
      {
        text: "Communication, Networking, Security, Blockchain, Cloud Computing".toUpperCase(),
        fontSize: 18,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },
      // toc sub-sections
      ...CN.map((project) => [
        {
          text: `${project.pid} : ${changeCase("sentence", project.title)} `,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [10, 0, 0, 0],
          marginBottom: 8,
          tocStyle: { fontSize: 12, alignment: "justify", marginBottom: 10 },
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.abstract}`,
              fontSize: 12,
              width: "auto",
              alignment: "justify",
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),
      {
        text: "Image Processing, DSP, Multimedia".toUpperCase(),
        fontSize: 24,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },
      // toc sub-sections
      ...DS.map((project) => [
        {
          text: `${project.pid} : ${changeCase("sentence", project.title)} `,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [10, 0, 0, 0],
          marginBottom: 8,
          tocStyle: { fontSize: 12, alignment: "justify", marginBottom: 10 },
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.abstract}`,
              fontSize: 12,
              width: "auto",
              alignment: "justify",
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),

      {
        text: "Embedded systems, VLSI, IoT, Remote sensing".toUpperCase(),
        fontSize: 24,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },
      // toc sub-sections
      ...ES.map((project) => [
        {
          text: `${project.pid} : ${changeCase("sentence", project.title)} `,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [10, 0, 0, 0],
          marginBottom: 8,
          tocStyle: { fontSize: 12, alignment: "justify", marginBottom: 10 },
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.abstract}`,
              fontSize: 12,
              width: "auto",
              alignment: "justify",
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),

      {
        text: "Machine Learning, Pattern Recognition, Artificial Intelligence, Expert System".toUpperCase(),
        fontSize: 18,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },

      // toc sub-sections
      ...ML.map((project) => [
        {
          text: `${project.pid} : ${changeCase("sentence", project.title)} `,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [10, 0, 0, 0],
          marginBottom: 8,
          tocStyle: { fontSize: 12, alignment: "justify", marginBottom: 10 },
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.abstract}`,
              fontSize: 12,
              width: "auto",
              alignment: "justify",
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),

      {
        text: "Others ( Bio-Signal Processing, Biomedical, Bioinformatics, etc.)".toUpperCase(),
        fontSize: 24,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },
      // toc sub-sections
      ...OT.map((project) => [
        {
          text: `${project.pid} : ${changeCase("sentence", project.title)} `,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [10, 0, 0, 0],
          marginBottom: 8,
          tocStyle: { fontSize: 12, alignment: "justify", marginBottom: 10 },
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.abstract}`,
              fontSize: 12,
              width: "auto",
              alignment: "justify",
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),
    ],
    pageMargins: [60, 60],
    defaultStyle: {
      font: "Times",
    },
  };

  return printer.createPdfKitDocument(docDefinition);
}

export default createSynopsis;
