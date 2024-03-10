import { promises, writeFile } from "node:fs";
import path from "node:path";

const documentationPath = path.join(__dirname, "../documentation/");
const servicePath = path.join(__dirname, "../services/");

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

async function clearDocumentFolder(directory: string): Promise<void> {
  await promises.rm(directory, { recursive: true });
  await promises.mkdir(directory);
}

async function run() {
  try {
    //* Clear document folder
    await clearDocumentFolder(documentationPath);

    //* Get types of services for converting to documentation
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
              output: `src/documentation/${file}`,
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
            output: `src/documentation/${folderVersion}/${folderName}/schema.ts`,
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
    const configFilePath = path.join(__dirname, "../../ts-to-zod.config.js");
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
