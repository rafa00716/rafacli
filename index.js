#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const successfullProcess = (value, name, path) => {
  console.log(
    chalk.white.bgGreen.bold(
      `¡Great! your ${getLabel(value)} ${name} was create in ${path}`
    )
  );
};

const generatorsEnables = [
  "nest_auth",
  "angular_auth",
  "angular_crud",
  "nest_crud",
  "styles_angular"
];

const initTitleText = chalk.red(
  figlet.textSync("RAFA CLI", {
    font: "Electronic",
    horizontalLayout: "default",
    verticalLayout: "default",
  })
);

const initDescriptionText = chalk.green(
  figlet.textSync(
    "Project to create a generator cli to cruds, modules, etc..",
    {
      font: "Digital",
      horizontalLayout: "default",
      verticalLayout: "default",
    }
  )
);

const init = () => {
  console.log(initTitleText);
  console.log(initDescriptionText);
};

const inquiries = () => {
  return inquirer.prompt([
    {
      name: "generator_option",
      type: "list",
      message: "¿What will you like create?",
      choices: generatorsEnables.map((key) => {
        return {
          name: getLabel(key),
          value: key,
        };
      }),
      required: true,
    },
    {
      name: "singularName",
      type: "input",
      message: "Write a singular name for you choice",
      required: true,
    },
    {
      name: "pluralName",
      type: "input",
      message: "Write a plurar name for you choice (deafult singular name choice)",
      required: false,
    },
    {
      name: "path",
      type: "input",
      message:
        "Write the path relative you current location wich you whant put the generator results",
      default: "./",
      required: false,
    },
  ]);
};

const run = async () => {
  init();
  const { singularName, _pluralName, generator_option, path } = await inquiries();

    let pluralName = _pluralName ?? singularName;

  copyAndModifyDir(
    `${__dirname}/generators/{{${generator_option}}}`,
    `${process.cwd()}/${path}/${toKebabCase(pluralName)}`,
    replacements(generator_option, singularName, pluralName)
  )
    .then(() => successfullProcess(generator_option, pluralName, path))
    .catch(console.error);
};

const getLabel = (key) => {
  switch (key) {
    case "nest_auth":
      return "Authentication in NestJS";
    case "angular_auth":
      return "Authentication in Angular";
    case "angular_crud":
      return "CRUD in Angular";
    case "nest_crud":
      return "CRUD in NestJS";
    case "styles_angular":
      return "Styles in Angular";
    default:
      return "Unknown";
  }
};

async function copyAndModifyDir(src, dest, replacements) {

  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    let srcPath = path.join(src, entry.name);

    // Modificar el nombre del archivo/carpeta si es necesario
    let modifiedName = entry.name;
    for (const [search, replace] of Object.entries(replacements)) {
      modifiedName = modifiedName.replace(new RegExp(search, "g"), replace);
    }

    let destPath = path.join(dest, modifiedName);
    if (entry.isDirectory()) {
      // Copiar y modificar recursivamente subdirectorios
      await copyAndModifyDir(srcPath, destPath, replacements);
    } else {
      // Leer el archivo
      let content = await fs.promises.readFile(srcPath, "utf8");

      // Modificar el contenido si es necesario
      for (const [search, replace] of Object.entries(replacements)) {
        content = content.replace(new RegExp(search, "g"), replace);
      }

      // Escribir el archivo modificado en la nueva ubicación
      await fs.promises.writeFile(destPath, content, "utf8");
    }
  }
}

const replacements = (generatorOption, singularName, pluralName) => {
  return { 
    [`{{${generatorOption}}}`]: toKebabCase(pluralName), 
    [`{{camelCaseSingular}}`]: toCamelCase(singularName),
    [`{{kebabCaseSingular}}`]: toKebabCase(singularName),
    [`{{classCaseSingular}}`]: toClassCase(singularName), 
    [`{{camelCasePlural}}`]: toCamelCase(pluralName),
    [`{{kebabCasePlural}}`]: toKebabCase(pluralName),
    [`{{classCasePlural}}`]: toClassCase(pluralName), 
};
};

const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Separa camelCase o PascalCase
    .replace(/\s+/g, "-") // Reemplaza espacios con "-"
    .toLowerCase(); // Convierte todo a minúsculas
};

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
};

const toClassCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^./, (match) => match.toUpperCase());
};

run();
