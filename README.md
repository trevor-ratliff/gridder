# Gridder CLI

This is a node.js console application to initiate a Symbols Starter-Kit project, and add components needed for a grid selector.  It can also create a grid selector instance that can be copied and pasted into a page in the starter kit.


## To Use

- You need to link the application so you can use `gridder` everywhere
  - in a command line, navigate to this apps root folder and run 
    ```
    > npm install
    > npm link
    ```
- Next you'll want to navigate to the directory where you'll want to initialize the Starter-Kit
- Once there run 
    ```
    > gridder init
    ```
  to pull down the "starter-kit" repository from GitHub, and copy the component building blocks into that project
- You can create a grid selector of your desired size using 
    ```
    > gridder create -x [NUMBER_OF_COLUMNS] -y [NUMBER_OF_ROWS]
    ```
- Copy the output, open the "starter-kit/src/pages.js" file in a text editor
  - add an import line for the component
    ```
    'use strict'

    import { GridSelector } from './comps/GridSelector'; 
    ...
    ```
  - and paste the generated code in the Symbols page you desire
- If you want to see your changes, run 
    ```
    > npm install
    > npm start
    ```
  and browse to the indicated URL, then navigate to your page

### Help

`gridder -h` will get you documentation on the gridder tool.

`gridder create -h` will show further details on create.
