import config from '../config/chapters'

/**
 * 获取章节信息
 * @param {string} chapter_name - 章节名称
 * @returns {Object} 包含章节名称和描述的对象
 */
const getChapterInfo = (chapter_name) => {
    const chapter = chapter_name
    const description = config[chapter]

    return {
        name: chapter,
        description: description
    }
}

export default getChapterInfo