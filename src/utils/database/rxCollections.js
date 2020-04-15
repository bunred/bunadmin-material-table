export const rxMtSetting = "bunadmin_mt_setting"
export const rxMtSettings = {
  updatedRowData: "updatedRowData"
}

export const rxMtCollections = [
  {
    name: rxMtSetting,
    schema: {
      title: "Bunadmin Material Table Setting",
      description: "Manage your table Settings",
      version: 0,
      type: "object",
      properties: {
        name: {
          type: "string",
          primary: true
        },
        updated_at: {
          type: "number",
          index: true
        },
        value: {
          type: "string"
        }
      },
      required: []
    }
  }
]
