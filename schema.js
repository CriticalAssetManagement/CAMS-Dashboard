[
    {
      "@base": "iri://CAMS/",
      "@schema": "iri://CAMS#",
      "@type": "@context"
    },
    {
      "@documentation": {
        "@comment": "Historical hazard",
        "@properties": {
          "comment": "A comment relating to an historic hazard incident.",
          "date": "The date at which the incident occurred."
        }
      },
      "@id": "HazardEvent",
      "@inherits": "Event",
      "@key": {
        "@fields": [
          "hazard",
          "date"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "comment": "xsd:string",
      "hazard": "Hazard"
    },
    {
      "@id": "Hazard",
      "@type": "Enum",
      "@value": [
        "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
        "Landslides (incl. post wildfire landslides) and Avalanches",
        "Hurricanes, Typhoons, or Cyclones",
        "Tropical/Extra Tropical of other extreme storms",
        "Coast Storm Surge",
        "Pluvial and Fluvial Flooding",
        "\"Sunny Day\" Tidal Flooding",
        "Tornadoes, Derechos, Micro-Bursts",
        "Lightning Strikes",
        "Wildfires",
        "Drought",
        "Geologic Sink Holes",
        "Pest Infestations",
        "Famine",
        "High Temperature Event",
        "Low Temperature Event",
        "Cyber Attack or Failure",
        "Other Terrorism",
        "Industrial Accident (Emissions, Releases, Spills, Ect.)"
      ]
    },
    {
      "@id": "Location",
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "city": "xsd:string",
      "geometry_location": {
        "@class": "Geometry",
        "@type": "Optional"
      },
      "postal_code": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "state": "xsd:string",
      "street": "xsd:string"
    },
    {
      "@id": "OSiProperties",
      "@inherits": "Properties",
      "@type": "Class",
      "NAMN1": "xsd:string",
      "OBJECTID": "xsd:integer"
    },
    {
      "@abstract": [],
      "@id": "Event",
      "@subdocument": [],
      "@type": "Class",
      "date": "xsd:dateTime"
    },
    {
      "@id": "Name_Type",
      "@type": "Enum",
      "@value": [
        "name"
      ]
    },
    {
      "@id": "MultiPolygon_Type",
      "@type": "Enum",
      "@value": [
        "MultiPolygon"
      ]
    },
    {
      "@id": "Area",
      "@type": "Class",
      "extent": {
        "@class": "AreaExtent",
        "@type": "Optional"
      },
      "hazard_history": {
        "@class": "HazardEvent",
        "@type": "Set"
      },
      "hazards": {
        "@class": "Hazard",
        "@type": "Set"
      },
      "name": "xsd:string",
      "population": {
        "@class": "xsd:integer",
        "@type": "Optional"
      }
    },
    {
      "@id": "LineString_Type",
      "@type": "Enum",
      "@value": [
        "LineString"
      ]
    },
    {
      "@abstract": [],
      "@id": "Source",
      "@type": "Class"
    },
    {
      "@id": "Polygon_Type",
      "@type": "Enum",
      "@value": [
        "Polygon"
      ]
    },
    {
      "@id": "Point_Type",
      "@type": "Enum",
      "@value": [
        "Point"
      ]
    },
    {
      "@id": "Feature",
      "@type": "Class",
      "bbox": {
        "@class": "xsd:string",
        "@dimensions": 1,
        "@type": "Array"
      },
      "centerline": {
        "@class": "Geometry",
        "@type": "Optional"
      },
      "geometry": "Geometry",
      "id": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "properties": "Properties",
      "title": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "type": "Feature_Type"
    },
    {
      "@documentation": {
        "@comment": "Update history",
        "@properties": {
          "comment": "A comment relating to an historic hazard incident.",
          "date": "The date at which the update occurred."
        }
      },
      "@id": "UpdateEvent",
      "@inherits": "Event",
      "@key": {
        "@fields": [
          "comment",
          "date"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "comment": "xsd:string"
    },
    {
      "@id": "DependencyRelation",
      "@type": "Class",
      "comment": "xsd:string",
      "critical": "xsd:boolean",
      "dependent": "Asset",
      "depends_on": "Asset"
    },
    {
      "@id": "CRS84_Type",
      "@type": "Enum",
      "@value": [
        "urn:ogc:def:crs:OGC:1.3:CRS84"
      ]
    },
    {
      "@id": "Asset",
      "@key": {
        "@fields": [
          "asset_identifier"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "applicable_hazards": {
        "@class": "GradedHazard",
        "@type": "Set"
      },
      "asset_history": {
        "@class": "Event",
        "@type": "Set"
      },
      "asset_identifier": "xsd:string",
      "asset_update_history": {
        "@class": "UpdateEvent",
        "@type": "Set"
      },
      "commisioning_date": "xsd:dateTime",
      "description": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "design_standards": "xsd:string",
      "last_maintained": "xsd:dateTime",
      "last_modified": "xsd:dateTime",
      "location": "Location",
      "name": "xsd:string",
      "owner": {
        "@class": "Owner",
        "@type": "Set"
      },
      "spatial_web_identifier": {
        "@class": "SpatialWebIdentifier",
        "@type": "Optional"
      }
    },
    {
      "@id": "FeatureCollection",
      "@type": "Class",
      "crs": {
        "@class": "name",
        "@type": "Optional"
      },
      "features": {
        "@class": "Feature",
        "@type": "Set"
      },
      "name": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "type": "FeatureCollection_Type"
    },
    {
      "@id": "Point",
      "@inherits": "Geometry",
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "coordinates": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "type": "Point_Type"
    },
    {
      "@id": "SpatialWebIdentifier",
      "@type": "Class",
      "id": "xsd:string"
    },
    {
      "@abstract": [],
      "@id": "AssetType",
      "@type": "Class",
      "name": "xsd:string"
    },
    {
      "@id": "AreaExtent",
      "@key": {
        "@type": "ValueHash"
      },
      "@subdocument": [],
      "@type": "Class",
      "perimeter": {
        "@class": "xsd:integer",
        "@type": "Optional"
      }
    },
    {
      "@id": "Owner",
      "@type": "Class",
      "contact_person": "Person",
      "name": "xsd:string"
    },
    {
      "@id": "GeoPerimeter",
      "@key": {
        "@fields": [
          "perimeter"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "perimeter": {
        "@class": "GeoCoordinate",
        "@type": "List"
      }
    },
    {
      "@abstract": [],
      "@id": "Geometry",
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class"
    },
    {
      "@id": "CRS84",
      "@inherits": "Properties",
      "@type": "Class",
      "name": "CRS84_Type"
    },
    {
      "@id": "LineString",
      "@inherits": "Geometry",
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "coordinates": {
        "@class": "xsd:decimal",
        "@dimensions": 2,
        "@type": "Array"
      },
      "type": "LineString_Type"
    },
    {
      "@id": "GradedHazard",
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Grade": {
        "@class": "xsd:decimal",
        "@type": "Optional"
      },
      "hazard": {
        "@class": "Hazard",
        "@type": "Optional"
      }
    },
    {
      "@id": "Person",
      "@type": "Class",
      "email_address": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "first_name": "xsd:string",
      "job_title": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "last_name": "xsd:string",
      "organization": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "phone_number": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    },
    {
      "@abstract": [],
      "@id": "Properties",
      "@type": "Class"
    },
    {
      "@id": "GeometryCollection_Type",
      "@type": "Enum",
      "@value": [
        "GeometryCollection"
      ]
    },
    {
      "@id": "name",
      "@type": "Class",
      "properties": "Properties",
      "type": "Name_Type"
    },
    {
      "@abstract": [],
      "@id": "FundingSource",
      "@type": "Class"
    },
    {
      "@id": "GeoCoordinate",
      "@key": {
        "@fields": [
          "latitude",
          "longitude"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "latitude": "xsd:decimal",
      "longitude": "xsd:decimal"
    },
    {
      "@id": "FeatureCollection_Type",
      "@type": "Enum",
      "@value": [
        "FeatureCollection"
      ]
    },
    {
      "@id": "Feature_Type",
      "@type": "Enum",
      "@value": [
        "Feature"
      ]
    }
  ]