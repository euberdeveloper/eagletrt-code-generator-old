# eagletrt-code-generator
Generate dinamically code for the [@eagletrt](https://www.github.com/eagletrt) telemetry

## Project purpose

This project is an **npm** package made for the **telemetry** of eagletrt. The telemetry is a **c program** located in a **Raspberry Pi** and attached to the canbus of the car and to a rover-gps. Its job is reading all the sensors **messages**, forwarding them via mqtt and saving them in a local mongodb database. In particular, all messages are **accumulated** in a **structure** for some hundreds of milliseconds, the structure is parsed to **bson** and then it is sent via mqtt and saved in the database, after that the process starts again. The problem is that c is a **statically typed** programming language while the structure of the saved data **changes very frequently** and is quite **articulated**. Change the c struct and the bson parser every time the structure was modified was a **hell**. Hence this project was made. I started thinking that there exist some **dynamically typed** languages, such as **typescript**. The structure of the saved data is now represented in a **json** file and there is this **nodejs** module that reads that json file and **generates the c code that depends on it**. So now **we just need to change that json file and execute this module, saving hours of time**.

## How it was made

This project was made with **typescript**. It is an npm module that can be used also **globally**, as a terminal command. It is linted with **eslint** and every time there is a push on github, it is checked by **travis.ci**.

## How does it work

The library gets as inputs a **src** folder and a **structure.json** file. Then it reads the json file, whose structure will **determine the generated code**, fetch all the files in the src folder whose extension is preceded by **.template** (example: `main.template.c`), search for some **special comments** in the code (such as `// {{GENERATE_BSON}}`) and **create** a file without the .template extension with the right **generated code instead of the comment**.

The part of the code that will probably be changed more frequently is the part where **code is generated**. It resides in the `source/generators` folder. All files with extension **.generator.ts** contain a class that extends the **Generator class**: they have a **generate** method that generates the code in base of the structure.json and a **comment field**, which is the comment string where the generated code will be put. To **add a new generator**, it is only needed to add a new file ending with **.generator.ts** containing a class extending **Generator** and properly implemented. All the rest of the code will remain unchanged.

## How to use it

This module can be actually used both as a **local** and a **global** npm module.

### As a local module

Install the module with:

```bash
npm install --save eagletrt-code-generator
```

Executing this script:

```javascript
const generator = require('eagletrt-code-generator');

const src = './code';
const structure = './code/structure.json';
const options = {
    extensions: ['c', 'h', 'cpp', 'hpp'],
    log: true
};

generator.generate(src, structure, options);
```

Given a directory tree such as:

```
code/
    structure/
        structure.template.h
        structure.c
    utils/
        utils.h
        utils.template.c
    main.template.c
```

Will result in:

```
code/
    structure/
        structure.template.h
        structure.h
        structure.c
    utils/
        utils.h
        utils.template.c
        utils.c
    main.template.c
    main.c
```

To see all the options, refer to the **api**.

### As a global module

Install the module with:

```bash
npm install -g eagletrt-code-generator
```

Executing:

```bash
eagle generate --src code --structure .code/structure.json --extensions c h
```

Will have the same result as the example with the local module.

The options are almost the same as in the **api** of the local module. To see all the cli options, run:

```bash
eagle generate --help
```

## The structure file

The structure file is a **json** file that **represents how will be saved the data** in mongodb.

Every message is an object containing the **timestamp** of the message and its **value**. If a message contains more than a value, the value property will be **a nested object**.

The structure consists in **a few primitive properties** and all the **message objects**, that can be **nested and grouped in other objects** and are always **inside an array**.

The arrays contain the message object as the first element, and the maximum dimension of the dynamically allocated array of messages.

An example of structure could be this:

```json
{
    "id": "int",
    "timestamp": "long",
    "sessionName": "char*",
    "throttle": [
        {
            "timestamp": "long",
            "value": "double"
        }, 200
    ],
    "brake": [
        {
            "timestamp": "long",
            "value": "double"
        }, 200
    ],
    "bms_hv": {
        "temperature": [
            {
                "timestamp": "long",
                "value": {
                    "max": "double",
                    "min": "double",
                    "average": "double"
                }
            }, 500
        ],
        "voltage": [
            {
                "timestamp": "long",
                "value": {
                    "max": "double",
                    "min": "double",
                    "total": "double"
                }
            }, 500
        ]
    }
}
```
A javascript instance of that structure could be:

```json
{
    "id": 23,
    "timestamp": 10483862400000,
    "sessionName": "2020_04_23__12_00_00__pilot_race",
    "throttle": [
        {
            "timestamp": 10483862400001,
            "value": 0
        },
        {
            "timestamp": 10483862400002,
            "value": 5
        },
        {
            "timestamp": 10483862400003,
            "value": 6
        }
    ],
    "brake": [
         {
            "timestamp": 10483862400001,
            "value": 0
        },
        {
            "timestamp": 10483862400004,
            "value": 100
        }
    ],
    "bms_hv": {
        "temperature": [
            {
                "timestamp": 10483862400000,
                "value": {
                    "max": 28,
                    "min": 22,
                    "average": 25
                }
            }
        ],
        "voltage": [
            {
                "timestamp": 10483862400000,
                "value": {
                    "max": 312,
                    "min": 200,
                    "total": 250
                }
            },
            {
                "timestamp": 10483862400007,
                "value": {
                    "max": 312,
                    "min": 200,
                    "total": 250
                }
            }
        ]
    }
}
```

Where every array contains all the messages of a certain type, arrived in x milliseconds.

## The generators

The generators are the **typescript classes** that replace a certain **special comment** with the **generated code**.

### bson.generator

| Comment | Description | template example | compiled example |
| --- | --- | --- | --- |
| {{GENERATE_BSON}} | Generates the code of the function that given the structure variable, creates the bson object | link | link |

### structure-type.generator

| Comment | Description | template example | compiled example |
| --- | --- | --- | --- |
| {{GENERATE_STRUCTURE_TYPE}} | Generates the c struct representing the structure | link | link |

### structure-allocator.generator

| Comment | Description | template example | compiled example |
| --- | --- | --- | --- |
| {{GENERATE_STRUCTURE_ALLOCATOR}} | Generates the code of the function that allocates the structure | link | link |

### structure-deallocator.generator

| Comment | Description | template example | compiled example |
| --- | --- | --- | --- |
| {{GENERATE_STRUCTURE_DEALLOCATOR}} | Generates the code of the function that deallocates the structure | link | link |

## 