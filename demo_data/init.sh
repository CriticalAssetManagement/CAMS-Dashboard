#!/bin/bash
if [ ! -d /app/terminusdb/storage/db ]; then
    ./terminusdb store init
    ./terminusdb organization create Miami
    ./terminusdb capability grant admin Miami -s organization
    ./terminusdb db create Miami/CAMS
    ./terminusdb doc insert --graph-type=schema --full-replace Miami/CAMS < /app/demo_data/cams_schema.json
    ./terminusdb doc insert --graph-type=instance  Miami/CAMS < /app/demo_data/cams_instance.json
fi
./terminusdb serve
