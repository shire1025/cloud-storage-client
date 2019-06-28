import { fakeClick } from './dom'

/**
 * 文件下载
 * @param {*} href
 * @param {*} fileName
 */
export function fileDownload(href, fileName) {
    console.log(href)
    var tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = href
    tempLink.setAttribute('download', fileName)

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
};

/**
 * 下载二进制文件
 * @param {x} name
 * @param {*} data
 */
export const exportRaw = (name, data) => {
    const urlObject = window.URL || window.webkitURL || window
    const exportBlob = new Blob([data])
    const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    saveLink.href = urlObject.createObjectURL(exportBlob)
    saveLink.download = name
    fakeClick(saveLink)
}

/**
 * 获取base64预览图
 * @param {*} file
 */
export function getBase64ByFile(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = reject
    })
};
