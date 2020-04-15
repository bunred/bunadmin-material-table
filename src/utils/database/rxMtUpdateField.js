import rxDb from "./rxConnect"
import {rxMtSetting, rxMtSettings} from "./rxCollections"

export default async function rxMtUpdateField({name, value}) {
    const db = await rxDb()
    // rx findOne
    const rxFindOne = db[rxMtSetting].findOne({name: {$eq: rxMtSettings.updatedRowData}})
    const rxDoc = await rxFindOne.exec()
    const changedData = rxDoc ? JSON.parse(rxDoc.value) : {}
    // updatedRowData
    const newData = { ...changedData, [name]: value }
    await db[rxMtSetting].atomicUpsert({
        name: rxMtSettings.updatedRowData,
        value: JSON.stringify(newData),
        updated_at: Date.now()
    })
}
