// 单张图片上传
export const uploadImgServer = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3333/gallery' : 'http://127.0.0.1:3333/gallery'