import _ from '../helper/lodash'
/**
 * 转换个平台Object数据信息至统一格式
 * @param item
 * @param platformType
 * @returns {{key: *, fsize: number, putTime: number, mimeType: string},ETag:String}
 */
export function convertMeta(item, platformType = 0) {
    switch (platformType) {
        case 'qiniu':
            item.putTime = item.putTime / 10000
            item.ETag = item.hash
            break
    }
    return item
}

/**
 * 平行结构转换成树结构
 * @param {*} flatMap
 */
export function FlatConvertTree(flatMap = []) {
    console.time('FlatConvertTree :')
    let map = {}
    flatMap.map((item, index) => {
        let keyMap = item.key.split('/')
        let nameIndex = keyMap.length - 1
        // 文件名
        let name = keyMap[nameIndex]
        // 目录层级
        let pathMap = keyMap.slice(0, keyMap.length - 1)
        // console.log('parentPath', pathMap)
        // console.log('pathMap', pathMap)

        // pathMap.splice(pathMap.length - 1, 1)
        // console.log('pathMap', pathMap)
        if (pathMap && pathMap.length > 0) {
            pathMap.map((pt, pi) => {
                let key = pathMap.slice(0, pi + 1).join('/')
                let parentPath = pathMap.slice(0, pi).join('/')
                map[key] = {
                    index: index,
                    pi: pi,
                    key: key,
                    parentPath: pi > 0 ? parentPath : undefined,
                    path: pt
                }
            })
        }
        // console.log('parentPath', pathMap[pathMap.length - 1])
        item.index = index
        item.pi = pathMap.length - 1
        item.parentPath = pathMap[pathMap.length - 1]
        item.path = name
        // map.push(item)
        map[item.key] = item
    })
    // let treeMap = []
    let treeMap = buildTree(map)
    console.log('treeMap', map)
    console.log('buildTree', treeMap)
    console.timeEnd('FlatConvertTree :')
    return treeMap
}

/**
 * 将一维的扁平数组转换为多层级对象
 * @param  {[type]} list 一维数组，数组中每一个元素需包含path和parentPath两个属性
 * @return {[type]} tree 多层级树状结构
 */
function buildTree(list, parentPath) {
    let map = {}
    let subMap = []
    // let node
    // let tree = []
    for (const key in list) {
        if (list.hasOwnProperty(key)) {
            let item = list[key]
            // 取第一层放入数组
            if (item.parentPath === parentPath) {
                map[item.path] = _.cloneDeep(item)
                // tree.push(_.cloneDeep(item))
            } else {
                // 剩余列表
                subMap.push(item)
            }
        }
    }
    // console.log('tree', map)
    // console.log('list, parentPath', list, parentPath)
    // 遍历 第一层
    for (const key in map) {
        if (map.hasOwnProperty(key) && !map[key].putTime) {
            let item = map[key]
            // 遍历 剩余列表
            let treeMap = buildTree(subMap, item.key)
            // console.log('遍历 剩余列表', treeMap)
            item.children = treeMap
        }
    }
    // console.log('tree', map)
    return map
}
