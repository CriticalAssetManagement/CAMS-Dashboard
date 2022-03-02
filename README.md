# CAMS-Dashboard
This repo relates to the CAMS project UI.

Featuring the front end code, it includes:

- User data capture - Forms for users to add, update, and delete critical asset information
- Critical asset map GUI
- Critical asset list GUI

For more information about the full project, please visit the [CAMS Repo](https://github.com/CriticalAssetManagement/CAMS).

## Getting started

### Step 1 - TerminusX

- Sign into TerminusX https://terminusdb.com/

- Create a new Data Product by the ID ```CAMSDemo```

- Add the CAMS schema which you will find https://github.com/CriticalAssetManagement/CAMS-Dashboard/schema.json

### Step 2 - Clone a dependency repo ```terminusdb-documents-ui```

- As of now, we use a dependency ```terminusdb-documents-ui```.
  We havent published this repo yet, so you will have to clone locally too for CAMS Dashboadr to clone
  https://github.com/terminusdb/terminusdb-documents-ui
    ``` https://github.com/terminusdb/terminusdb-documents-ui.git ```

- After cloning ```cd terminusdb-documents-ui```

- ```npm run install ```

### Step 3 - Clone CAMS Dashboard repo ```CAMS-Dashboard```

- Clone https://github.com/CriticalAssetManagement/CAMS-Dashboard locally
  ``` git clone https://github.com/CriticalAssetManagement/CAMS-Dashboard.git ```

- After cloning ```cd CAMS-Dashboard```

- ```npm run install ```

- Create an ```.env``` file and include the below variables.

    ```
    let team = process.env.MY_TEAM                  // your team
    let token = process.env.MY_TOKEN                // your personal token
    let user = process.env.MY_USER                  // your email account used for signing into TerminusX
    let server = process.env.TERMINUSDB_SERVER      // TerminusX URL https://dashboard.terminusdb.com/
    ```

    Refer https://terminusdb.com/docs/index/terminusx/quick-start/get-api-key on how to get your team and token information
    from TerminusX.

- Run locally ```npm run start ```





