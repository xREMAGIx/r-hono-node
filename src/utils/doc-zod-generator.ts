import { promises, writeFile } from "node:fs";
import path from "node:path";
import { clearFolder, getFiles } from "./custom-fs";

const schemasPath = path.join(process.cwd(), "src/schemas/");
const servicePath = path.join(process.cwd(), "src/services/");

async function run() {
  try {
    //* Clear document folder
    await clearFolder(schemasPath);
    await promises.mkdir(schemasPath);

    //* Get types of services for converting to schemas
    const serviceFiles = await getFiles(servicePath);
    const serviceConvertList = serviceFiles.reduce(
      (
        prevList: {
          name: string;
          input: string;
          output: string;
        }[],
        filePath
      ) => {
        const file = filePath.slice(servicePath.length);
        if (file === "general.ts") {
          return [
            ...prevList,
            {
              name: "general",
              input: `src/services/${file}`,
              output: `src/schemas/${file}`,
            },
          ];
        }

        if (!file.includes("types.ts")) return prevList;

        const [folderVersion, folderName, fileName] = file.split("/");

        return [
          ...prevList,
          {
            name: fileName,
            input: `src/services/${file}`,
            output: `src/schemas/${folderVersion}/${folderName}/schemas.ts`,
          },
        ];
      },
      []
    );

    const serviceConvertString = serviceConvertList
      .map((ele) => JSON.stringify(ele))
      .join(",");

    const convertString = serviceConvertString;

    //* Write to ts-to-zod.config.js
    const configFilePath = path.join(process.cwd(), "ts-to-zod.config.js");
    writeFile(
      configFilePath,
      `
/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [${convertString}];
        `,
      (err) => {
        if (err) throw err;
      }
    );
  } catch (error) {
    console.error(error);
  }
}

run();
