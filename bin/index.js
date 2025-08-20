#!/usr/bin/env node

import { program } from 'commander'
import { exec } from 'node:child_process'
import { copyFileSync, constants, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const projectRoot = path.join(path.dirname(process.argv[1]), '..')
const cwd = process.cwd()
let pwd = cwd
if (cwd.indexOf('starter-kit') >= 0) {
  pwd = cwd.substring(0, cwd.indexOf('starter-kit') - 1)
}
const hasStarterKit = existsSync(path.join(pwd, '/starter-kit'))
const file = '/gridSelector.js'
const filePath = '/comps'

const source = path.join(projectRoot, filePath, file)
const destPath = path.join(pwd, `/starter-kit/src${filePath}`)
const dest = path.join(destPath, file)

/* console.debug(
  `\ncwd [${cwd}]`,
  `\npwd [${pwd}]`,
  `\nprojectRoot [${projectRoot}]`,
  `\nsource [${source}]`,
  `\ndestPath [${destPath}]`,
  `\ndest [${dest}]`
); */

function CopyComponentFiles () {
  // copy component file into starter-kit
  if (!existsSync(dest)) {
    try {
      console.log(`Copying needed components from\n  '${source}'\n  to\n  '${dest}'`)
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true })
      }
      copyFileSync(source, dest, constants.COPYFILE_EXCL)
    } catch (err) {
      console.warn('The needed components file has already been copied.', err)
    }
  }
}

program
  .version('1.0.0')
  .description('Gridder CLI')
  // .option('-r, --myRows <int>', 'how many rows?')
  // .option('-c, --myCols <int>', 'how many columns?')
  .action((options) => {
    // console.log(`you asked for ${options.myRows} rows and ${options.myCols} columns!`);
    console.log('\nRun `gridder init` to get the "starter kit" ready for gridder commands')
    console.log('\nRun `gridder create -x [number of columns] -y [number of rows]` to create a grid selector component to copy into your symbols app')
    console.log('\nRun `gridder -h` for help')
    console.log('\n')
  })

program.command('init')
  .description('initializes the current folder with a Symbols start-up app')
  .action((options) => {
    if (!hasStarterKit) {
      console.log("calling 'git clone git@github.com:symbo-ls/starter-kit.git'")

      exec('git clone git@github.com:symbo-ls/starter-kit.git',
        (error, stdout, stderr) => {
          if (error) {
            console.warn(`something went wrong getting the Starter-Kit: ${error}`)
            console.warn(`stderr: ${stderr}`)
          }

          console.log(`${stdout}\n`)
          CopyComponentFiles()
          console.log('\n')
        }
      )
    }

    // CopyComponentFiles();
    // console.log('\n\n');
  })

program.command('create')
  .description('creates a Symbols grid select component with the specified columns (x) and rows (y)')
  .option('-y, --rows <int>', 'how many rows?', 8)
  .option('-x, --cols <int>', 'how many columns?', 16)
  .action((options) => {
    // cut out with a message to run init if there isn't the starter-kit directory
    if (!hasStarterKit) {
      console.log('\nPlease run `gridder init` before running `gridder create`')
      console.log('\n')
      return
    }

    // copy component file into starter-kit
    // try {
    //   console.log(`Copying needed components from '${source}' to '${dest}'`);
    //   if (!existsSync(destPath)) {
    //     mkdirSync(destPath, { recursive: true });
    //   }
    //   copyFileSync(source, dest, constants.COPYFILE_EXCL);
    // } catch (err) {
    //   console.warn('The needed components file has already been copied.', err);
    // }
    CopyComponentFiles()

    // create new GridSelector component
    console.log(`\ncreating a grid with ${options.cols} columns, and ${options.rows} rows!`)
    const curDate = new Date()
    const compName = `GridSelector${options.cols}x${options.rows}`
    const spaceSize = options.cols > options.rows ? `calc(50vw / ${options.cols})` : `calc(50vw / ${options.rows})`
    const data = []

    // generate state data for the grid selector
    for (let yy = 0; yy < (options.rows); yy++) {
      for (let xx = 0; xx < (options.cols); xx++) {
        data.push({ col: xx, row: yy, isSelected: false })
      }
    }

    // fill the template
    const compTemplate = `
${compName}: {
  extends: GridSelector,
  state: {
    cols: ${options.cols},
    rows: ${options.rows},
    grid: ${JSON.stringify(data)}
  },
  InnerGrid: {
    gap: 'Y',
    childProps: {
      height: '${spaceSize}',
      width: '${spaceSize}'
    }
  }
}
    `

    console.log('import the "GridSelector" component into your Symbols app page with')
    console.log('  `import { GridSelector } from \'./comps/GridSelector\';`')
    console.log('\nCopy the following and paste it in your page:')
    console.log(compTemplate)
    console.log('\n')
  })

// program.parse(process.argv);
program.parse()
